import { Controller, Get, Header, Query } from '@nestjs/common';
import { MarketRateDto } from './market-rate.dto';
import { CacheTTL } from '@nestjs/cache-manager';
import { DeploymentService, ExchangeId } from '../../deployment/deployment.service';
import { BlockchainType, Deployment } from '../../deployment/deployment.service';
import { ApiExchangeIdParam, ExchangeIdParam } from '../../exchange-id-param.decorator';
import { CodexService } from '../../codex/codex.service';
import { CoinGeckoService } from '../../quote/coingecko.service';
import { BlockchainProviderConfig } from '../../historic-quote/historic-quote.service';

@Controller({ version: '1', path: ':exchangeId?/market-rate' })
export class MarketRateController {
  private priceProviders: BlockchainProviderConfig = {
    [BlockchainType.Ethereum]: [
      { name: 'coingecko', enabled: true },
      { name: 'codex', enabled: true },
    ],
    [BlockchainType.Sei]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Celo]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Blast]: [{ name: 'codex', enabled: true }],
    [BlockchainType.Iota]: [{ name: 'coingecko', enabled: true }],
    [BlockchainType.Mantle]: [{ name: 'coingecko', enabled: true }],
    [BlockchainType.Berachain]: [{ name: 'codex', enabled: true }],
  };

  constructor(
    private deploymentService: DeploymentService,
    private codexService: CodexService,
    private coinGeckoService: CoinGeckoService,
  ) {}

  @Get('')
  @CacheTTL(1 * 1000)
  @Header('Cache-Control', 'public, max-age=60')
  @ApiExchangeIdParam()
  async marketRate(@ExchangeIdParam() exchangeId: ExchangeId, @Query() params: MarketRateDto): Promise<any> {
    const deployment: Deployment = await this.deploymentService.getDeploymentByExchangeId(exchangeId);
    const { address, convert } = params;
    const currencies = convert.split(',');

    const enabledProviders = this.priceProviders[deployment.blockchainType].filter((p) => p.enabled);

    let data = null;
    let usedProvider = null;

    for (const provider of enabledProviders) {
      try {
        switch (provider.name) {
          case 'codex':
            data = await this.codexService.getLatestPrices(deployment, [address]);
            break;
          case 'coingecko':
            data = await this.coinGeckoService.fetchLatestPrice(deployment, address, currencies);
            break;
        }

        const addressLower = address.toLowerCase();
        const hasValidPriceData = Object.keys(data[addressLower]).some(
          (key) => key !== 'provider' && key !== 'last_updated_at',
        );

        if (data && Object.keys(data).length > 0 && data[addressLower] && hasValidPriceData) {
          usedProvider = provider.name;
          break;
        }
      } catch (error) {
        console.error(`Error fetching price from ${provider.name}:`, error);
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
      if (data[address.toLowerCase()] && data[address.toLowerCase()][c.toLowerCase()]) {
        result.data[c.toUpperCase()] = data[address.toLowerCase()][c.toLowerCase()];
      }
    });

    return result;
  }
}
