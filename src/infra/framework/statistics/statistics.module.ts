import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { GetStatisticsUseCase } from 'src/use-cases/statistics/get-statistics/get-statistics';
import { StatisticRepository } from 'src/core/repositories/statistics.repository';
import { StatisticsCacheMemoryRepository } from 'src/infra/data/cache-memory/statistics-cache-memory.repository';
import { TransactionsRepository } from 'src/core/repositories/transactions.repository';
import { TransactionsModule } from '../transactions/transactions.module';
import { StoreSingletonModule } from 'src/infra/data/async-local-storage.module';
import { StoreSingleton } from 'src/infra/data/cache-memory/cache-store.repository';

@Module({
    imports: [StoreSingletonModule, TransactionsModule],
    controllers: [StatisticsController],
    providers: [
        {
            provide: StatisticRepository,
            useFactory: (storeService: StoreSingleton) => 
                new StatisticsCacheMemoryRepository(storeService),
            inject: [StoreSingleton],
        },
        {
            provide: GetStatisticsUseCase,
            useFactory: (transactionsRepository: TransactionsRepository) =>
                new GetStatisticsUseCase(transactionsRepository),
            inject: [TransactionsRepository],
        },
    ]
})
export class StatisticsModule {}