import { UseCase } from "src/core/base/use-case";
import { StatisticRepository } from "src/core/repositories/statistics.repository";
import { StatisticDto } from "src/shared/dtos/statistic/get-statistics.dto";

export class GetStatisticsUseCase implements UseCase<StatisticDto> {

    constructor(private readonly repository: StatisticRepository) { }

    public async execute(): Promise<StatisticDto> {
        const statistics = await this.repository.get();
        return statistics;
    }
}