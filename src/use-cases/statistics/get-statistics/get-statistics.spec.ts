import { GetStatisticsUseCase } from './get-statistics';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { TransactionEntity } from 'src/core/domain/entities/transaction.entity';
import { StatisticEntity } from 'src/core/domain/entities/statitic.entity';

describe('GetStatisticsUseCase', () => {
  let getStatisticsUseCase: GetStatisticsUseCase;
  let transactionsRepository: jest.Mocked<TransactionsRepository>;

  beforeEach(() => {
    transactionsRepository = {
      getAll: jest.fn(),
      create: jest.fn(),
      deleteAll: jest.fn(),
      get: jest.fn(),
      getById: jest.fn(),
    } as unknown as jest.Mocked<TransactionsRepository>;

    getStatisticsUseCase = new GetStatisticsUseCase(transactionsRepository);
  });

  it('should be defined', () => {
    expect(getStatisticsUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should get transactions and return statistics', async () => {
      // Arrange
      const now = new Date();
      const transactions = [
        new TransactionEntity(100, now),
        new TransactionEntity(200, now),
        new TransactionEntity(300, now),
      ];
      
      transactionsRepository.getAll.mockResolvedValue(transactions);
      
      const createFromTransactionsSpy = jest.spyOn(StatisticEntity, 'createFromTransactions');
      const mockStatisticEntity = new StatisticEntity(3, 600, 200, 100, 300, now);
      createFromTransactionsSpy.mockReturnValue(mockStatisticEntity);

      const result = await getStatisticsUseCase.execute();

      expect(transactionsRepository.getAll).toHaveBeenCalled();
      expect(createFromTransactionsSpy).toHaveBeenCalledWith(transactions);
      expect(result).toEqual({
        sum: 600,
        count: 3,
        avg: 200,
        min: 100,
        max: 300,
        timestamp: now
      });
    });
  });
});