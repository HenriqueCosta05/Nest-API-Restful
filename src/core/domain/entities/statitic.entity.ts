import { Entity } from "src/core/base/entity";
import { TransactionEntity } from "./transaction.entity";
import { DomainValidationException } from "src/shared/exceptions/DomainValidationException";

export class StatisticEntity extends Entity {
    count: number;
    sum: number;
    avg: number;
    min: number;
    max: number;
    timestamp: Date;

    constructor(count: number, sum: number, avg: number, min: number, max: number, timestamp: Date = new Date()) {
        super();

        if (timestamp > new Date()) {
            throw new DomainValidationException("Timestamp must not be in the future");
        }

        if (count === 0) {
            this.count = 0;
            this.sum = 0;
            this.avg = 0;
            this.min = 0;
            this.max = 0;
        } else {
            if (count < 0) {
                throw new DomainValidationException("Count cannot be negative");
            }
            
            if (min > max) {
                throw new DomainValidationException("Min value cannot be greater than max value");
            }

            this.count = count;
            this.sum = sum;
            this.avg = avg;
            this.min = min;
            this.max = max;
        }
        
        this.timestamp = timestamp;
    }

        static createFromTransactions(transactions: TransactionEntity[]): StatisticEntity {
        const sixtySecondsAgo = new Date(Date.now() - 60 * 1000);
        
        const recentTransactions = transactions.filter(transaction => {
            if (!transaction || !transaction.timestamp) {
                return false;
            }
            
            let txTimestamp = transaction.timestamp;
            if (typeof txTimestamp === 'string') {
                txTimestamp = new Date(txTimestamp);
            }
            
            if (!(txTimestamp instanceof Date) || isNaN(txTimestamp.getTime())) {
                return false;
            }
            
            return txTimestamp >= sixtySecondsAgo;
        });
    
        const totalCount = recentTransactions.length;
        
        if (totalCount === 0) {
            return new StatisticEntity(0, 0, 0, 0, 0, new Date());
        }
    
        const total = recentTransactions.reduce((acc, transaction) => {
            return acc + (typeof transaction.amount === 'number' ? transaction.amount : 0);
        }, 0);
    
        const amounts = recentTransactions.map(transaction => transaction.amount);
        const min = Math.min(...amounts);
        const max = Math.max(...amounts);
        const avg = total / totalCount;
    
        return new StatisticEntity(totalCount, total, avg, min, max, new Date());
    }
}