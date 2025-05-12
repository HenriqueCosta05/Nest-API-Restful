import { Module } from '@nestjs/common';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Logger } from 'winston';
import { TerminusModule } from '@nestjs/terminus';
import { HealthModule } from './health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { StoreSingletonModule } from '../data/async-local-storage.module';

@Module({
    imports: [TransactionsModule, StatisticsModule, TerminusModule, HealthModule, StoreSingletonModule,
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 10,
                },
            ],
        }),
    ],
    providers: [Logger],
})
export class AppModule { }
