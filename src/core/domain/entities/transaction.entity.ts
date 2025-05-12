import { Entity } from "src/core/base/entity";
import { DomainValidationException } from "src/shared/exceptions/DomainValidationException";

export class TransactionEntity extends Entity {
    amount: number;
    timestamp: Date;

    constructor(amount: number, timestamp: Date) {
        if (amount < 0) {
            throw new DomainValidationException("Amount must not be negative");
        }

        if (timestamp && isNaN(Date.parse(timestamp.toString()))) {
            throw new DomainValidationException("Timestamp must be a valid date in ISO 8601 format");
        }

        if (timestamp && new Date(timestamp) > new Date()) {
            throw new DomainValidationException("Timestamp must not be in the future");
        }

        super();
        this.amount = amount;
        this.timestamp = timestamp || new Date();
    }
}