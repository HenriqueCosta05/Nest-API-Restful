import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions/transactions.controller';
import { StatisticsController } from './statistics/statistics.controller';
import { TransactionsModule } from './transactions/transactions.module';
import { Logger } from 'winston';

@Module({
    imports: [TransactionsModule],
    controllers: [TransactionsController, StatisticsController],
    providers: [Logger],
})
export class AppModule { }