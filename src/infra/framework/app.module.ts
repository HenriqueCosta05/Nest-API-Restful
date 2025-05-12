import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Logger } from 'winston';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';

@Module({
    imports: [TransactionsModule, StatisticsModule, TerminusModule, HealthModule, 
        ThrottlerModule.forRoot({
            throttlers: [
                {
                    ttl: 60000,
                    limit: 10,
                },
            ],
        }), UsersModule,
     ],
    providers: [Logger],
})
export class AppModule { }