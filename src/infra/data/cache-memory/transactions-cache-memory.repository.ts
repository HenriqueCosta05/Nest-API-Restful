import { TransactionEntity } from "src/core/domain/entities/transaction.entity";
import { RepositoryCacheMemory } from "./cache-memory.repository";
import { TransactionsRepository } from "src/core/repositories/transactions.repository";

export class TransactionsCacheMemoryRepository
    extends RepositoryCacheMemory<TransactionEntity>
    implements TransactionsRepository { }
