import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { StatisticsModule } from './statistics/statistics.module';
import { Logger } from 'winston';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/health.controller';
import { HealthModule } from './health/health.module';

@Module({
    imports: [ TransactionsModule, StatisticsModule, TerminusModule, HealthModule ],
    controllers: [TransactionsController, StatisticsController, HealthController],
    providers: [Logger],
})
export class AppModule { }