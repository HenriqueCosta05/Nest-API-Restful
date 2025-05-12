import { StatisticRepository } from "src/core/repositories/statistics.repository";
import { StatisticEntity } from "src/core/domain/entities/statitic.entity";
import { RepositoryCacheMemory } from "./cache-memory.repository";

export class StatisticsCacheMemoryRepository
    extends RepositoryCacheMemory<StatisticEntity>
    implements StatisticRepository {}