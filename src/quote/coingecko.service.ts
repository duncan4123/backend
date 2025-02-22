import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { BlockchainType, Deployment } from '../deployment/deployment.service';
import { DefiLlamaTokenPrice } from './types';

@Injectable()
export class CoinGeckoService {
  private readonly logger = new Logger(CoinGeckoService.name);
  constructor(private configService: ConfigService) {}

  private readonly baseURL = 'https://pro-api.coingecko.com/api/v3';

  async getLatestPrices(
    contractAddresses: string[],
    deployment: Deployment,
    convert = ['usd'],
    isGas = false,
  ): Promise<any> {
    const blockchainType = deployment.blockchainType;

    const result: Record<string, any> = {};
    for (const address of contractAddresses) {
      let addressLower = address.toLowerCase();
      if (isGas) {
        addressLower = deployment.gasToken.address.toLowerCase();
      }
      try {
        const price = await this.fetchTokenPrice(address, blockchainType);

        Object.assign(result, {
          [addressLower]: {
            usd: price,
            last_updated_at: Math.floor(Date.now() / 1000),
            provider: 'coingecko',
          },
        });
      } catch (error) {
        throw new Error(`Failed to fetch latest token prices: ${error.message}`);
      }
    }

    return result;
  }

  async fetchLatestPrice(deployment: Deployment, address: string, convert = ['usd']): Promise<any> {
    try {
      let price;
      if (address.toLowerCase() === deployment.gasToken.address.toLowerCase()) {
        price = await this.getLatestGasTokenPrice(deployment, convert);
      } else {
        price = await this.getLatestPrices([address], deployment, convert);
      }
      return price;
    } catch (error) {
      this.logger.error(`Error fetching price: ${error.message}`);
    }
  }

  async getLatestGasTokenPrice(deployment: Deployment, convert = ['usd']): Promise<any> {
    const wrappedGasMapping = {
      'iota-evm': '0x6e47f8d48a01b44df3fff35d258a10a3aedc114c',
      mantle: '0x78c1b0C915c4FAA5FffA6CAbf0219DA63d7f4cb8',
      berachain: '0x6969696969696969696969696969696969696969',
    };
    const wrappedGasAddress = wrappedGasMapping[deployment.blockchainType];

    try {
      const price = await this.getLatestPrices([wrappedGasAddress], deployment, convert, true);
      return price;
    } catch (error) {
      throw new Error(`Failed to fetch latest gas token prices: ${error.message}`);
    }
  }

  async fetchTokenPrice(token: string, blockchainType: BlockchainType) {
    try {
      const price = await Promise.any([
        this.geckoterminalPrice(token, blockchainType),
        this.defillamaPrice(token, blockchainType),
      ]);
      return price;
    } catch (e) {
      if (e instanceof AggregateError) {
        for (const err of e.errors) {
          console.error(err);
        }
      }
      throw new Error('Token not found on any of the supported endpoints.');
    }
  }

  async geckoterminalPrice(address: string, blockchainType: BlockchainType) {
    const response = await axios.get(
      `https://api.geckoterminal.com/api/v2/networks/${blockchainType}/tokens/${address}`,
    );
    if (response.data['data']['attributes']['total_reserve_in_usd'] > 1000) {
      return response.data['data']['attributes']['price_usd'] as number;
    } else {
      throw new Error('Token not found on Geckoterminal or liquidity is too low.');
    }
  }

  async defillamaPrice(token: string, blockchainType: BlockchainType) {
    const blockchainTypeToDefillamaMapping = {
      'iota-evm': 'iotaevm',
      mantle: 'mantle',
    };

    const chainToken = `${blockchainTypeToDefillamaMapping[blockchainType].toLowerCase()}:${token.toLowerCase()}`;

    const res = await fetch(`https://coins.llama.fi/prices/current/${chainToken}`);
    const json = (await res.json()) as DefiLlamaTokenPrice;
    const price = json.coins[chainToken]?.price;

    if (price) {
      return price;
    } else {
      throw new Error('Token not found on DeFi Llama or last update was more than 2 minutes ago.');
    }
  }
}
