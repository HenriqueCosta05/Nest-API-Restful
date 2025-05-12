import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { TransactionsCacheMemoryRepository } from 'src/infra/data/cache-memory/transactions-cache-memory.repository';

@Module({
    controllers: [TransactionsController],
    providers: [
        {
            provide: TransactionsRepository,
            useClass: TransactionsCacheMemoryRepository,
        },
        {
            provide: CreateTransactionUseCase,
            useFactory: (repository: TransactionsRepository) =>
                new CreateTransactionUseCase(repository),
            inject: [TransactionsRepository],
        },
        {
            provide: DeleteAllTransactionsUseCase,
            useFactory: (repository: TransactionsRepository) =>
                new DeleteAllTransactionsUseCase(repository),
            inject: [TransactionsRepository],
        },
    ],
  })
export class TransactionsModule {}