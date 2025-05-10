import { Mapper } from "src/core/base/mapper";
import { StatisticDto } from "src/shared/dtos/statistic/get-statistics.dto";
import { StatisticEntity } from "../../entities/statitic.entity";

export class GetStatistics extends Mapper<StatisticDto[], StatisticEntity[]> {
    public mapFrom(param: StatisticDto[]): StatisticEntity[] {
        return param.map((statistic) => {
            const statitic = new StatisticEntity(
                statistic.count,
                statistic.sum,
                statistic.avg,
                statistic.min,
                statistic.max,
                statistic.timestamp,
            );

            statitic.id = statistic.id;

            return statitic;
        });
    }

    public mapTo(param: StatisticEntity[]): StatisticDto[] {
        return param.map((statistic) => {
            const statitic = new StatisticDto();
            statitic.id = statistic.id;
            statitic.count = statistic.count;
            statitic.sum = statistic.sum;
            statitic.avg = statistic.avg;
            statitic.min = statistic.min;
            statitic.max = statistic.max;
            statitic.timestamp = statistic.timestamp;

            return statitic;
        });
    }
}