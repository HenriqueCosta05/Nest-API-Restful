import { StoreSingleton } from "./cache-store.repository";
import { Injectable } from '@nestjs/common';
import { StatisticEntity } from "src/core/domain/entities/statitic.entity";
import { StatisticRepository } from "src/core/repositories/statistics.repository";
import { RepositoryCacheMemory } from "./cache-memory.repository";

@Injectable()
export class StatisticsCacheMemoryRepository
    extends RepositoryCacheMemory<StatisticEntity>
    implements StatisticRepository {
        
    constructor(storeService: StoreSingleton) {
        super(storeService, 'StatisticsRepository');
    }
}