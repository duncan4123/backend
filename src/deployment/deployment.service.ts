// deployment.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const NATIVE_TOKEN = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';

export enum BlockchainType {
  Ethereum = 'ethereum',
  Sei = 'sei-network',
  Celo = 'celo',
  Blast = 'blast',
  Iota = 'iota-evm',
}

export enum ExchangeId {
  OGEthereum = 'ethereum',
  OGSei = 'sei',
  OGCelo = 'celo',
  OGBlast = 'blast',
  OGIota = 'iota',
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
  nativeTokenAlias?: string;
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
        exchangeId: ExchangeId.OGIota,
        blockchainType: BlockchainType.Iota,
        rpcEndpoint: this.configService.get('IOTA_RPC_ENDPOINT'),
        harvestEventsBatchSize: 2000000,
        harvestConcurrency: 10,
        multicallAddress: '0xcA11bde05977b3631167028862bE2a173976CA11',
        startBlock: 1936296,
        gasToken: {
          name: 'IOTA',
          symbol: 'IOTA',
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

  getDeploymentByBlockchainType(blockchainType: BlockchainType): Deployment {
    const deployment = this.deployments.find((d) => d.blockchainType === blockchainType);
    if (!deployment) {
      throw new Error(`Deployment for blockchainType ${blockchainType} not found`);
    }
    return deployment;
  }
}
