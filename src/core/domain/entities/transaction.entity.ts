import { Entity } from "src/core/base/entity";

export class TransactionEntity extends Entity {
    amount: number;
    timestamp: Date;
}