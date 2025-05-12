import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';
import { CreateTransactionDto } from 'src/shared/dtos/transaction/create-transaction.dto';

jest.mock('src/use-cases/transactions/create-transaction/create-transaction');
jest.mock('src/use-cases/transactions/delete-all-transactions/delete-all-transactions');

describe('TransactionsController', () => {
  let controller: TransactionsController;
  let createTransactionUseCase: jest.Mocked<CreateTransactionUseCase>;
  let deleteAllTransactionsUseCase: jest.Mocked<DeleteAllTransactionsUseCase>;

  beforeEach(async () => {
    jest.clearAllMocks();
    
    (CreateTransactionUseCase as jest.MockedClass<typeof CreateTransactionUseCase>).mockImplementation(() => ({
      execute: jest.fn(),
    } as unknown as CreateTransactionUseCase));
    
    (DeleteAllTransactionsUseCase as jest.MockedClass<typeof DeleteAllTransactionsUseCase>).mockImplementation(() => ({
      execute: jest.fn(),
    } as unknown as DeleteAllTransactionsUseCase));
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        CreateTransactionUseCase,
        DeleteAllTransactionsUseCase,
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
    createTransactionUseCase = module.get(CreateTransactionUseCase) as jest.Mocked<CreateTransactionUseCase>;
    deleteAllTransactionsUseCase = module.get(DeleteAllTransactionsUseCase) as jest.Mocked<DeleteAllTransactionsUseCase>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createTransaction', () => {
    it('should call createTransactionUseCase.execute with the provided transaction', async () => {
      const transaction: CreateTransactionDto = {
        amount: 123.45,
        timestamp: new Date(),
      };
      const expectedResult = { ...transaction, id: 'test-id' };
      
      createTransactionUseCase.execute.mockResolvedValueOnce(expectedResult);

      const result = await controller.createTransaction(transaction);

      expect(createTransactionUseCase.execute).toHaveBeenCalledWith(transaction);
      expect(createTransactionUseCase.execute).toHaveBeenCalledTimes(1);
      expect(result).toEqual(expectedResult);
    });
    
    it('should handle errors from createTransactionUseCase.execute', async () => {
      const transaction: CreateTransactionDto = {
        amount: 123.45,
        timestamp: new Date(),
      };
      const errorMessage = 'Failed to create transaction';
      
      createTransactionUseCase.execute.mockRejectedValueOnce(new Error(errorMessage));

      await expect(controller.createTransaction(transaction)).rejects.toThrow(errorMessage);
      expect(createTransactionUseCase.execute).toHaveBeenCalledWith(transaction);
      expect(createTransactionUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });

  describe('deleteAllTransactions', () => {
    it('should call deleteAllTransactionsUseCase.execute', async () => {
      deleteAllTransactionsUseCase.execute.mockResolvedValueOnce(undefined);

      await controller.deleteAllTransactions();

      expect(deleteAllTransactionsUseCase.execute).toHaveBeenCalled();
      expect(deleteAllTransactionsUseCase.execute).toHaveBeenCalledTimes(1);
    });
    
    it('should handle errors from deleteAllTransactionsUseCase.execute', async () => {
      const errorMessage = 'Failed to delete transactions';
      
      deleteAllTransactionsUseCase.execute.mockRejectedValueOnce(new Error(errorMessage));

      await expect(controller.deleteAllTransactions()).rejects.toThrow(errorMessage);
      expect(deleteAllTransactionsUseCase.execute).toHaveBeenCalledTimes(1);
    });
  });
});