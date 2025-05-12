import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { GetStatisticsUseCase } from 'src/use-cases/statistics/get-statistics/get-statistics';
import { StatisticRepository } from 'src/core/repositories/statistics.repository';
import { StatisticsCacheMemoryRepository } from 'src/infra/data/cache-memory/statistics-cache-memory.repository';

@Module({
controllers: [StatisticsController],
    providers: [
        {
            provide: StatisticRepository,
            useClass: StatisticsCacheMemoryRepository,
        },
        {
            provide: GetStatisticsUseCase,
            useFactory: (repository: StatisticRepository) => {
                return new GetStatisticsUseCase(repository);
            },
            inject: [StatisticRepository],
        },
    ]})
export class StatisticsModule {}
