import { Test, TestingModule } from '@nestjs/testing';
import { SimulatorController } from './simulator.controller';
import { SimulatorService } from './simulator.service';
import { DeploymentService, Deployment, ExchangeId, BlockchainType } from '../../deployment/deployment.service';
import { BadRequestException } from '@nestjs/common';
import { SimulatorDto } from './simulator.dto';
import { PredictionDataDto } from './prediction-data.dto';
import { HistoricQuoteService } from '../../historic-quote/historic-quote.service';

describe('SimulatorController', () => {
  let controller: SimulatorController;
  let simulatorService: SimulatorService;
  let deploymentService: DeploymentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulatorController],
      providers: [
        {
          provide: SimulatorService,
          useValue: {
            generateSimulationWithPrediction: jest.fn(),
          },
        },
        {
          provide: DeploymentService,
          useValue: {
            getDeploymentByExchangeId: jest.fn(),
          },
        },
        {
          provide: HistoricQuoteService,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<SimulatorController>(SimulatorController);
    simulatorService = module.get<SimulatorService>(SimulatorService);
    deploymentService = module.get<DeploymentService>(DeploymentService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('simulateWithPrediction', () => {
    it('should successfully simulate with prediction data', async () => {
      const mockExchangeId: ExchangeId = ExchangeId.OGBase;
      const mockSimulatorDto: SimulatorDto = {
        start: Math.floor(Date.now() / 1000) - 86400 * 30,
        end: Math.floor(Date.now() / 1000),
        baseToken: 'ETH',
        quoteToken: 'USDC',
        buyBudget: 1000,
        sellBudget: 1000,
        buyMin: 1800,
        buyMax: 2000,
        sellMin: 2200,
        sellMax: 2400,
      };
      const mockPredictionDataDto: PredictionDataDto = {
        predictionData: [
          { timestamp: mockSimulatorDto.start, open: 1900, high: 1950, low: 1850, close: 1900 },
          { timestamp: mockSimulatorDto.end, open: 2100, high: 2150, low: 2050, close: 2100 },
        ],
      };
      const mockDeployment: Deployment = {
        exchangeId: mockExchangeId,
        blockchainType: BlockchainType.Base, // Assuming BlockchainType.Base exists
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
      const mockSimulationResult = { result: 'mock simulation result' };

      // Update the mock implementation
      (deploymentService.getDeploymentByExchangeId as jest.Mock).mockResolvedValue(mockDeployment);
      (simulatorService.generateSimulationWithPrediction as jest.Mock).mockResolvedValue(mockSimulationResult);

      const result = await controller.simulateWithPrediction(
        mockSimulatorDto,
        mockPredictionDataDto,
        mockExchangeId
      );

      // Print the simulation result
      console.log('Simulation Result:', JSON.stringify(result, null, 2));

      expect(result).toEqual(mockSimulationResult);
      expect(deploymentService.getDeploymentByExchangeId).toHaveBeenCalledWith(mockExchangeId);
      expect(simulatorService.generateSimulationWithPrediction).toHaveBeenCalledWith(
        mockSimulatorDto,
        mockPredictionDataDto,
        mockDeployment
      );
    });

    // You can add more test cases here for error handling if needed
  });
});