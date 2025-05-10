import { Entity } from "src/core/base/entity";

export class StatisticEntity extends Entity {
    count: number;
    sum: number;
    avg: number;
    min: number;
    max: number;
    timestamp: Date;

    constructor(count: number, sum: number, avg: number, min: number, max: number, timestamp: Date) {
        super();

        const lastMinute = new Date(Date.now() - 60 * 1000);
        const isCountValid = timestamp > lastMinute;

        if (!isCountValid) {
            throw new Error("Timestamp must be in the last minute");
        }

        if (count === 0) {
            this.avg = 0;
            this.min = 0;
            this.max = 0;
            this.sum = 0;
        }

        this.count = count;
        this.sum = sum;
        this.avg = avg;
        this.min = min;
        this.max = max;
        this.timestamp = timestamp;
    }
}