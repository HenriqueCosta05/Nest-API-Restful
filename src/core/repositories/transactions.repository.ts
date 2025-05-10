import { Repository } from "../base/repository";
import { TransactionEntity } from "../domain/entities/transaction.entity";

export abstract class TransactionsRepository extends Repository<TransactionEntity> {}