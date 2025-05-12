import { UseCase } from "src/core/base/use-case";
import { TransactionsRepository } from "src/core/repositories/transactions.repository";
import { StatisticDto } from "src/shared/dtos/statistic/get-statistics.dto";
import { StatisticEntity } from "src/core/domain/entities/statitic.entity";

export class GetStatisticsUseCase implements UseCase<StatisticDto> {
    constructor(
        private readonly transactionsRepository: TransactionsRepository
    ) {}

    public async execute(): Promise<StatisticDto> {
        // 1. Get all transactions (infrastructure concern)
        const transactions = await this.transactionsRepository.getAll();
        
        // 2. Calculate statistics using domain entity (domain concern)
        const statisticsEntity = StatisticEntity.createFromTransactions(transactions);
        
        // 3. Return DTO mapped from entity
        return {
            sum: statisticsEntity.sum,
            count: statisticsEntity.count,
            avg: statisticsEntity.avg,
            min: statisticsEntity.min,
            max: statisticsEntity.max,
            timestamp: statisticsEntity.timestamp
        };
    }
}