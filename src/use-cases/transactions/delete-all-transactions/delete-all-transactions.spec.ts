import { DeleteAllTransactionsUseCase } from './delete-all-transactions';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { TransactionEntity } from 'src/core/domain/entities/transaction.entity';

describe('DeleteAllTransactionsUseCase', () => {
  let deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase;
  let transactionsRepository: jest.Mocked<TransactionsRepository>;

  beforeEach(() => {
    transactionsRepository = {
      getAll: jest.fn(),
      deleteAll: jest.fn(),
      create: jest.fn(),
      get: jest.fn(),
      getById: jest.fn(),
    } as unknown as jest.Mocked<TransactionsRepository>;

    deleteAllTransactionsUseCase = new DeleteAllTransactionsUseCase(transactionsRepository);
  });

  it('should be defined', () => {
    expect(deleteAllTransactionsUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should get all transactions and delete them', async () => {
      // Arrange
      const transactions = [
        new TransactionEntity(100, new Date()),
        new TransactionEntity(200, new Date())
      ];
      
      transactionsRepository.getAll.mockResolvedValue(transactions);
      transactionsRepository.deleteAll.mockResolvedValue(undefined);

      // Act
      await deleteAllTransactionsUseCase.execute();

      // Assert
      expect(transactionsRepository.getAll).toHaveBeenCalled();
      expect(transactionsRepository.deleteAll).toHaveBeenCalledWith(transactions);
    });
  });
});