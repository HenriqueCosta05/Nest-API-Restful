import { Entity } from "src/core/base/entity";

export class TransactionEntity extends Entity {
    amount: number;
    timestamp: Date;

    constructor(amount: number, timestamp: Date) {
        if (amount < 0) {
            throw new Error("Amount must not be negative");
        }

        if (timestamp && !(timestamp instanceof Date)) {
            throw new Error("Timestamp must be a valid date in ISO 8601 format");
        }

        if (timestamp && timestamp > new Date()) {
            throw new Error("Timestamp must not be in the future");
        }

        super();
        this.amount = amount;
        this.timestamp = timestamp || new Date();
    }
}