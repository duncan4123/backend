import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorService } from './simulator.service';
import { DeploymentService, Deployment, ExchangeId, BlockchainType } from '../../deployment/deployment.service';
import { SimulatorDto } from './simulator.dto';
import { PredictionDataDto, HistoricQuote } from './prediction-data.dto';
import * as agtUsdcMockData from '../mocks/agt-usdc-mock-data.json';
import { TradingFeePpmUpdatedEventService } from '../../events/trading-fee-ppm-updated-event/trading-fee-ppm-updated-event.service';
import { PairTradingFeePpmUpdatedEventService } from '../../events/pair-trading-fee-ppm-updated-event/pair-trading-fee-ppm-updated-event.service';
import { HistoricQuoteService } from '../../historic-quote/historic-quote.service';

describe('SimulatorService', () => {
  let service: SimulatorService;
  let deploymentService: DeploymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SimulatorService,
        {
          provide: DeploymentService,
          useValue: {
            getDeploymentByExchangeId: jest.fn(),
          },
        },
        {
          provide: TradingFeePpmUpdatedEventService,
          useValue: {},
        },
        {
          provide: PairTradingFeePpmUpdatedEventService,
          useValue: {},
        },
        {
          provide: HistoricQuoteService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SimulatorService>(SimulatorService);
    deploymentService = module.get<DeploymentService>(DeploymentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateSimulationWithPrediction', () => {
    it('should generate correct simulation results using AGT-USDC mock data', async () => {
      const mockSimulatorDto: SimulatorDto = {
        start: 1719756000,
        end: 1727445600,
        baseToken: 'AGT',
        quoteToken: 'USDC',
        buyBudget: 10000,
        sellBudget: 10000,
        buyMin: 0.1,
        buyMax: 130,
        sellMin: 0.1,
        sellMax: 130,
      };

      const mockPredictionDataDto: PredictionDataDto = {
        predictionData: agtUsdcMockData as HistoricQuote[],
      };

      const mockDeployment: Deployment = {
        exchangeId: ExchangeId.OGBase,
        blockchainType: BlockchainType.Base,
        rpcEndpoint: 'https://mock-rpc-endpoint.com',
        harvestEventsBatchSize: 1000,
        harvestConcurrency: 5,
        multicallAddress: '0x1234567890123456789012345678901234567890',
        gasToken: {
          name: 'Ethereum',
          symbol: 'ETH',
          address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        },
        startBlock: 1000000,
      };

      (deploymentService.getDeploymentByExchangeId as jest.Mock).mockResolvedValue(mockDeployment);

      const result = await service.generateSimulationWithPrediction(
        mockSimulatorDto,
        mockPredictionDataDto,
        mockDeployment
      );

      console.log('Simulation Result:', JSON.stringify(result, null, 2));

      expect(result).toBeDefined();
      // Add more specific assertions based on your expected results
    });
  });
});