// deployment.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export enum BlockchainType {
  Ethereum = 'ethereum',
  Sei = 'sei-network',
  Base = 'base',
}

export enum ExchangeId {
  OGEthereum = 'ethereum',
  OGSei = 'sei',
  OGBase = 'base',
}

export interface GasToken {
  name: string;
  symbol: string;
  address: string;
}

export interface Deployment {
  exchangeId: ExchangeId;
  blockchainType: BlockchainType;
  rpcEndpoint: string;
  harvestEventsBatchSize: number;
  harvestConcurrency: number;
  multicallAddress: string;
  gasToken: GasToken;
  startBlock: number;
}

@Injectable()
export class DeploymentService {
  private deployments: Deployment[];

  constructor(private configService: ConfigService) {
    this.deployments = this.initializeDeployments();
  }

  private initializeDeployments(): Deployment[] {
    return [
      {
        exchangeId: ExchangeId.OGEthereum,
        blockchainType: BlockchainType.Ethereum,
        rpcEndpoint: this.configService.get('ETHEREUM_RPC_ENDPOINT'),
        harvestEventsBatchSize: 2000000,
        harvestConcurrency: 10,
        multicallAddress: '0x5Eb3fa2DFECdDe21C950813C665E9364fa609bD2',
        startBlock: 17087000,
        gasToken: {
          name: 'Ethereum',
          symbol: 'ETH',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        },
      },
      {
        exchangeId: ExchangeId.OGSei,
        blockchainType: BlockchainType.Sei,
        rpcEndpoint: this.configService.get('SEI_RPC_ENDPOINT'),
        harvestEventsBatchSize: 1000,
        harvestConcurrency: 30,
        multicallAddress: '0x51aA24A9230e62CfaF259c47DE3133578cE36317',
        startBlock: 79146720,
        gasToken: {
          name: 'Sei',
          symbol: 'SEI',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        },
      },

      {
        exchangeId: ExchangeId.OGBase,
        blockchainType: BlockchainType.Base,
        rpcEndpoint: 'https://mainnet.base.org',
        harvestEventsBatchSize: 1000,
        harvestConcurrency: 5,
        multicallAddress: '0xca11bde05977b3631167028862be2a173976ca11',
        startBlock: 5315952,
        gasToken: {
          name: 'ETH',
          symbol: 'ETH',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        },
      },
    ];
  }

  getDeployments(): Deployment[] {
    return this.deployments;
  }

  getDeploymentByExchangeId(exchangeId: ExchangeId): Deployment {
    const deployment = this.deployments.find((d) => d.exchangeId === exchangeId);
    if (!deployment) {
      throw new Error(`Deployment for exchangeId ${exchangeId} not found`);
    }
    return deployment;
  }
}
