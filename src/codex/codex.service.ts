import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Codex } from '@codex-data/sdk';
import moment from 'moment';
import { BlockchainType, Deployment, NATIVE_TOKEN } from '../deployment/deployment.service';
import { TokenRankingAttribute, RankingDirection } from '@codex-data/sdk/src/sdk/generated/graphql';

export const SEI_NETWORK_ID = 531;
export const CELO_NETWORK_ID = 42220;
export const ETHEREUM_NETWORK_ID = 1;
export const MANTLE_NETWORK_ID = 5000;
export const BERACHAIN_NETWORK_ID = 80094;

@Injectable()
export class CodexService {
  private sdk: Codex;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('CODEX_API_KEY');
    this.sdk = new Codex(apiKey);
  }

  async getLatestPrices(deployment: Deployment, addresses: string[]): Promise<any> {
    const networkId = this.getNetworkId(deployment.blockchainType);
    if (!networkId) return null;

    const originalAddresses = [...addresses];
    let nativeTokenAliasUsed = false;

    // Replace only if targetAddress (NATIVE_TOKEN) is present in addresses
    if (deployment.nativeTokenAlias) {
      addresses = addresses.map((address) => {
        if (address.toLowerCase() === NATIVE_TOKEN.toLowerCase()) {
          nativeTokenAliasUsed = true;
          return deployment.nativeTokenAlias;
        }
        return address;
      });
    }

    const result = {};
    const tokens = await this.fetchTokens(networkId, addresses);

    tokens.forEach((t) => {
      const address = t.token.address.toLowerCase();
      const originalAddress = originalAddresses.find(
        (addr) =>
          addr.toLowerCase() === address || (nativeTokenAliasUsed && addr.toLowerCase() === NATIVE_TOKEN.toLowerCase()),
      );

      if (originalAddress) {
        result[originalAddress.toLowerCase()] = {
          address: originalAddress.toLowerCase(),
          usd: Number(t.priceUSD),
          provider: 'codex',
          last_updated_at: moment().unix(),
        };
      }
    });

    return result;
  }

  async getHistoricalQuotes(networkId: number, tokenAddresses: string[], from: number, to: number) {
    const limit = (await import('p-limit')).default;
    const concurrencyLimit = limit(1);
    const maxPoints = 1499;
    const resolution = 240; // Resolution in minutes (adjustable here)
    const resolutionSeconds = resolution * 60; // Convert resolution to seconds
    const maxBatchDuration = maxPoints * resolutionSeconds; // Max batch duration in seconds

    const fetchWithRetry = async (tokenAddress: string, batchFrom: number, batchTo: number): Promise<any> => {
      try {
        const bars = await this.sdk.queries.bars({
          symbol: `${tokenAddress}:${networkId}`,
          from: batchFrom,
          to: batchTo,
          resolution: `${resolution}`, // Use resolution variable
          removeLeadingNullValues: true,
        });
        return { ...bars.getBars, address: tokenAddress };
      } catch (error) {
        console.error(`Error fetching data for ${tokenAddress}, retrying...`, error);
        return fetchWithRetry(tokenAddress, batchFrom, batchTo);
      }
    };

    const fetchAllBatches = async (tokenAddress: string): Promise<any> => {
      const batchedResults = [];
      for (let start = from; start < to; start += maxBatchDuration) {
        const end = Math.min(start + maxBatchDuration, to);
        batchedResults.push(await fetchWithRetry(tokenAddress, start, end));
      }
      return batchedResults.flatMap((result) => result);
    };

    try {
      const results = await Promise.all(
        tokenAddresses.map((tokenAddress) => concurrencyLimit(() => fetchAllBatches(tokenAddress))),
      );

      const quotesByAddress = {};
      results.forEach((batchedResult, index) => {
        const tokenAddress = tokenAddresses[index];
        quotesByAddress[tokenAddress] = batchedResult.flatMap((result) =>
          result.t.map((timestamp: number, i: number) => ({
            timestamp,
            usd: result.c[i],
          })),
        );
      });

      return quotesByAddress;
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  }

  async getAllTokenAddresses(networkId: number): Promise<string[]> {
    const tokens = await this.fetchTokens(networkId);
    const uniqueAddresses = Array.from(new Set(tokens.map((t) => t.token.address.toLowerCase())));
    return uniqueAddresses;
  }

  private async fetchTokens(networkId: number, addresses?: string[]) {
    const limit = 200;
    let offset = 0;
    let allTokens = [];
    let fetched = [];

    do {
      try {
        const result = await this.sdk.queries.filterTokens({
          filters: {
            network: [networkId],
          },
          tokens: addresses || undefined, // Use addresses if provided, otherwise fetch all
          limit,
          offset,
        });

        fetched = result.filterTokens.results;
        allTokens = [...allTokens, ...fetched];
        offset += limit;
      } catch (error) {
        console.error('Error fetching tokens:', error);
        throw error;
      }
    } while (fetched.length === limit);

    return allTokens;
  }

  private getNetworkId(blockchainType: string): number {
    switch (blockchainType) {
      case BlockchainType.Sei:
        return SEI_NETWORK_ID;
      case BlockchainType.Celo:
        return CELO_NETWORK_ID;
      case BlockchainType.Ethereum:
        return ETHEREUM_NETWORK_ID;
      case BlockchainType.Mantle:
        return MANTLE_NETWORK_ID;
      case BlockchainType.Berachain:
        return BERACHAIN_NETWORK_ID;
      default:
        return null;
    }
  }

  /**
   * Gets a list of top tokens by volume for a specific network
   * @param networkId The blockchain network ID
   * @param limit Maximum number of tokens to return
   * @returns Array of token addresses sorted by volume
   */
  async getTopTokenAddresses(networkId: number, limit: number = 100): Promise<string[]> {
    try {
      const result = await this.sdk.queries.filterTokens({
        filters: {
          network: [networkId],
        },
        rankings: [
          {
            attribute: TokenRankingAttribute.Volume24,
            direction: RankingDirection.Desc
          }
        ],
        limit
      });
      
      // Extract addresses from the results
      const tokenAddresses = (result.filterTokens?.results || [])
        .map(item => item.token?.address?.toLowerCase())
        .filter(Boolean);
      
      console.log(`Found ${tokenAddresses.length} top token addresses on network ${networkId}`);
      
      return tokenAddresses;
    } catch (error) {
      console.error(`Error fetching top token addresses for network ${networkId}:`, error);
      return []; // Return empty array on error
    }
  }
}
