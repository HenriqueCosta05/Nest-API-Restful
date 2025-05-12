import { Injectable } from '@nestjs/common';
import { TransactionEntity } from "src/core/domain/entities/transaction.entity";
import { TransactionsRepository } from "src/core/repositories/transactions.repository";
import { RepositoryCacheMemory } from "./cache-memory.repository";
import { StoreSingleton } from './cache-store.repository';

@Injectable()
export class TransactionsCacheMemoryRepository
    extends RepositoryCacheMemory<TransactionEntity>
    implements TransactionsRepository {
        
    constructor(storeService: StoreSingleton) {
        super(storeService, 'TransactionsRepository');
    }
}