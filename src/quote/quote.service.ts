import { Injectable, Logger, OnModuleInit, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from './quote.entity';
import { TokenService } from '../token/token.service';
import { CoinGeckoService } from './coingecko.service';
import { SchedulerRegistry } from '@nestjs/schedule';
import { Token } from '../token/token.entity';
import { ConfigService } from '@nestjs/config';
import { DeploymentService, Deployment, BlockchainType } from '../deployment/deployment.service';
import { CodexService } from '../codex/codex.service';

export interface QuotesByAddress {
  [address: string]: Quote;
}

interface PriceProvider {
  name: string;
  enabled: boolean;
}

interface BlockchainProviderConfig {
  [key: string]: PriceProvider[];
}

@Injectable()
export class QuoteService implements OnModuleInit {
  private isPolling = false;
  private readonly logger = new Logger(QuoteService.name);
  private readonly intervalDuration: number;
  private readonly SKIP_TIMEOUT = 24 * 60 * 60; // 24 hours in seconds
  private shouldPollQuotes: boolean;
  private readonly priceProviders: BlockchainProviderConfig = {
    [BlockchainType.Ethereum]: [
      { name: 'coingecko', enabled: true },
      { name: 'codex', enabled: true },
    ],
    [BlockchainType.Sei]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Celo]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Blast]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Iota]: [{ name: 'coingecko', enabled: true }],
    [BlockchainType.Mantle]: [{ name: 'codex', enabled: true }],
  };

  constructor(
    @InjectRepository(Quote) private quoteRepository: Repository<Quote>,
    private tokenService: TokenService,
    private coingeckoService: CoinGeckoService,
    private configService: ConfigService,
    private schedulerRegistry: SchedulerRegistry,
    private deploymentService: DeploymentService,
    private codexService: CodexService,
    @Inject('REDIS') private redis: any,
  ) {
    this.intervalDuration = +this.configService.get('POLL_QUOTES_INTERVAL') || 60000;
    this.shouldPollQuotes = this.configService.get('SHOULD_POLL_QUOTES') === '1';
  }

  async onModuleInit() {
    if (this.shouldPollQuotes) {
      const callback = () => this.pollForLatest();
      const interval = setInterval(callback, this.intervalDuration);
      this.schedulerRegistry.addInterval('pollForLatest', interval);
    }
  }

  async pollForLatest(): Promise<void> {
    if (this.isPolling) {
      this.logger.warn('Polling is already in progress.');
      return;
    }

    this.isPolling = true;

    try {
      const deployments = await this.deploymentService.getDeployments();

      await Promise.all(deployments.map((deployment) => this.pollForDeployment(deployment)));
    } catch (error) {
      this.logger.error(`Error fetching and storing quotes: ${error.message}`);
    } finally {
      console.log('QUOTES SERVICE - Finished updating quotes');
      this.isPolling = false; // Reset the flag regardless of success or failure
    }
  }

  async pollForDeployment(deployment: Deployment): Promise<void> {
    try {
      const tokens = await this.tokenService.getTokensByBlockchainType(deployment.blockchainType);
      const addresses = tokens.map((t) => t.address);

      let newPrices;
      if (deployment.blockchainType === BlockchainType.Sei) {
        newPrices = await this.codexService.getLatestPrices(deployment, addresses);
      } else if (deployment.blockchainType === BlockchainType.Celo) {
        newPrices = await this.codexService.getLatestPrices(deployment, addresses);
      } else if (deployment.blockchainType === BlockchainType.Mantle) {
        newPrices = await this.codexService.getLatestPrices(deployment, addresses);
      } else {
        newPrices = await this.coingeckoService.getLatestPrices(addresses, deployment);
        const gasTokenPrice = await this.coingeckoService.getLatestGasTokenPrice(deployment);
        newPrices = { ...newPrices, ...gasTokenPrice };
      }

      await this.updateQuotes(tokens, newPrices, deployment);
    } catch (error) {
      this.logger.error(
        `Error fetching and storing quotes for blockchain ${deployment.blockchainType}: ${error.message}`,
      );
    }
  }

  async all(): Promise<Quote[]> {
    return this.quoteRepository.find();
  }

  async allByAddress(deployment: Deployment): Promise<QuotesByAddress> {
    const all = await this.quoteRepository.find({ where: { blockchainType: deployment.blockchainType } });
    const tokensByAddress = {};
    all.forEach((q) => (tokensByAddress[q.token.address] = q));
    return tokensByAddress;
  }

  private async updateQuotes(tokens: Token[], newPrices: Record<string, any>, deployment: Deployment): Promise<void> {
    const existingQuotes = await this.quoteRepository.find();
    const quoteEntities: Quote[] = [];

    for (const token of tokens) {
      const priceWithTimestamp = newPrices[token.address.toLowerCase()];

      if (priceWithTimestamp) {
        const quote = existingQuotes.find((q) => q.token.id === token.id) || new Quote();
        quote.provider = priceWithTimestamp.provider;
        quote.token = token;
        quote.blockchainType = deployment.blockchainType; // Set the blockchain type here
        quote.timestamp = new Date(priceWithTimestamp.last_updated_at * 1000);
        quote.usd = priceWithTimestamp.usd;
        quoteEntities.push(quote);
      }
    }

    await this.quoteRepository.save(quoteEntities);
  }

  async getLatestPrice(deployment: Deployment, address: string, currencies: string[]): Promise<any> {
    const enabledProviders = this.priceProviders[deployment.blockchainType].filter((p) => p.enabled);
    const addressLower = address.toLowerCase();

    let data = null;
    let usedProvider = null;

    for (const provider of enabledProviders) {
      const shouldSkip = await this.shouldSkipProvider(deployment.blockchainType, address, provider.name);
      if (shouldSkip) {
        this.logger.log(`Skipping ${provider.name} due to previous failure for ${address}`);
        continue;
      }

      try {
        data = await this.fetchPriceFromProvider(provider.name, deployment, address, currencies);

        const hasValidPriceData = Object.keys(data[addressLower]).some(
          (key) => key !== 'provider' && key !== 'last_updated_at',
        );

        if (data && Object.keys(data).length > 0 && data[addressLower] && hasValidPriceData) {
          usedProvider = provider.name;
          break;
        }
      } catch (error) {
        this.logger.error(`Error fetching price from ${provider.name}:`, error);
        await this.setProviderSkipFlag(deployment.blockchainType, address, provider.name);
      }
      data = null;
    }

    if (!data || Object.keys(data).length === 0) {
      throw new Error(`No price data available for token: ${address}`);
    }

    const result = {
      data: {},
      provider: usedProvider,
    };

    currencies.forEach((c) => {
      if (data[addressLower] && data[addressLower][c.toLowerCase()]) {
        result.data[c.toUpperCase()] = data[addressLower][c.toLowerCase()];
      }
    });

    return result;
  }

  private async fetchPriceFromProvider(
    provider: string,
    deployment: Deployment,
    address: string,
    currencies: string[],
  ): Promise<any> {
    switch (provider) {
      case 'codex':
        return this.codexService.getLatestPrices(deployment, [address]);
      case 'coingecko':
        return this.coingeckoService.fetchLatestPrice(deployment, address, currencies);
      default:
        return null;
    }
  }

  private async shouldSkipProvider(blockchainType: string, address: string, provider: string): Promise<boolean> {
    const key = `skip:${blockchainType}:${address}:${provider}`;
    return (await this.redis.get(key)) === '1';
  }

  private async setProviderSkipFlag(blockchainType: string, address: string, provider: string): Promise<void> {
    const key = `skip:${blockchainType}:${address}:${provider}`;
    await this.redis.setex(key, this.SKIP_TIMEOUT, '1');
  }
}
