import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { TransactionsCacheMemoryRepository } from 'src/infra/data/cache-memory/transactions-cache-memory.repository';
import { StoreSingletonModule } from 'src/infra/data/async-local-storage.module';
import { StoreSingleton } from 'src/infra/data/cache-memory/cache-store.repository';

@Module({
    imports: [StoreSingletonModule],
    controllers: [TransactionsController],
    providers: [
        {
            provide: TransactionsRepository,
            useFactory: (storeService: StoreSingleton) => 
                new TransactionsCacheMemoryRepository(storeService),
            inject: [StoreSingleton],
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
    exports: [TransactionsRepository],
})
export class TransactionsModule {}