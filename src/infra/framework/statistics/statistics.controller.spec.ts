import { Test, TestingModule } from '@nestjs/testing';
import { StatisticsController } from './statistics.controller';
import { GetStatisticsUseCase } from 'src/use-cases/statistics/get-statistics/get-statistics';
import { StatisticDto } from 'src/shared/dtos/statistic/get-statistics.dto';

describe('StatisticsController', () => {
  let controller: StatisticsController;
  let getStatisticsUseCase: GetStatisticsUseCase;

  beforeEach(async () => {
    const getStatisticsMock = {
      execute: jest.fn(),
    };
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatisticsController],
      providers: [
        {
          provide: GetStatisticsUseCase,
          useValue: getStatisticsMock,
        },
      ],
    }).compile();

    controller = module.get<StatisticsController>(StatisticsController);
    getStatisticsUseCase = module.get<GetStatisticsUseCase>(GetStatisticsUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStatistics', () => {
    it('should call getStatisticsUseCase.execute and return the result', async () => {
      const mockStatistics: StatisticDto = {
        count: 10,
        sum: 1000,
        avg: 100,
        min: 10,
        max: 200,
        timestamp: new Date()
      };
      jest.spyOn(getStatisticsUseCase, 'execute').mockResolvedValue(mockStatistics);

      const result = await controller.getStatistics();

      expect(getStatisticsUseCase.execute).toHaveBeenCalled();
      expect(result).toBe(mockStatistics);
    });
  });
});