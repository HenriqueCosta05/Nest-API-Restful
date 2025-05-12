import { CreateTransactionUseCase } from './create-transaction';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { CreatedTransactionDto } from 'src/shared/dtos/transaction/created-transaction.dto';
import { TransactionEntity } from 'src/core/domain/entities/transaction.entity';
import { CreateTransactionMappper } from 'src/core/domain/mappers/transaction/create-transaction';
import { CreatedTransactionMappper } from 'src/core/domain/mappers/transaction/created-transaction';

jest.mock('src/core/domain/mappers/transaction/create-transaction');
jest.mock('src/core/domain/mappers/transaction/created-transaction');

describe('CreateTransactionUseCase', () => {
  let createTransactionUseCase: CreateTransactionUseCase;
  let transactionsRepository: jest.Mocked<TransactionsRepository>;

  beforeEach(() => {
    transactionsRepository = {
      create: jest.fn(),
      deleteAll: jest.fn(),
      get: jest.fn(),
      getById: jest.fn(),
      getAll: jest.fn(),
    } as unknown as jest.Mocked<TransactionsRepository>;

    jest.clearAllMocks();
    
    (CreateTransactionMappper as jest.Mock).mockImplementation(() => ({
      mapFrom: jest.fn(),
    }));
    
    (CreatedTransactionMappper as jest.Mock).mockImplementation(() => ({
      mapTo: jest.fn(),
    }));

    createTransactionUseCase = new CreateTransactionUseCase(transactionsRepository);
  });

  it('should be defined', () => {
    expect(createTransactionUseCase).toBeDefined();
  });

  describe('execute', () => {
    it('should create transaction and return mapped result', async () => {
      // Arrange
      const transactionDto: CreatedTransactionDto = {
        amount: 123.45,
        timestamp: new Date(),
      };
      
      const transactionEntity = new TransactionEntity(123.45, new Date());
      const createdEntityWithId = { ...transactionEntity, id: 'test-id' };
      const mappedResult = { ...transactionDto, id: 'test-id' };
      
      const createTransactionMapper = (createTransactionUseCase as any).createTransactionMapper;
      const createdTransactionMapper = (createTransactionUseCase as any).createdTransactionMapper;
      
      createTransactionMapper.mapFrom.mockReturnValue(transactionEntity);
      transactionsRepository.create.mockResolvedValue(createdEntityWithId);
      createdTransactionMapper.mapTo.mockReturnValue(mappedResult);

      const result = await createTransactionUseCase.execute(transactionDto);

      expect(createTransactionMapper.mapFrom).toHaveBeenCalledWith(transactionDto);
      expect(transactionsRepository.create).toHaveBeenCalledWith(transactionEntity);
      expect(createdTransactionMapper.mapTo).toHaveBeenCalledWith(createdEntityWithId);
      expect(result).toBe(mappedResult);
    });
  });
});