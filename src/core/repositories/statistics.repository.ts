import { Repository } from "../base/repository";
import { StatisticEntity } from "../domain/entities/statitic.entity";

export abstract class StatisticRepository extends Repository<StatisticEntity> {}