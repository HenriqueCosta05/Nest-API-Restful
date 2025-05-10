import { ApiProperty } from "@nestjs/swagger";


export class StatisticDto {
    id?: string;

    @ApiProperty({
        example: 10,
        description: "The number of transactions",
        required: true,
    })
    count: number;

    @ApiProperty({
        example: 1234.56,
        description: "The sum of the amounts of the transactions (positive or zero)",
        required: true,
    })
    sum: number;

    @ApiProperty({
        example: 123.45,
        description: "The average amount of the transactions (positive or zero)",
        required: true,
    })
    avg: number;

    @ApiProperty({
        example: 1.23,
        description: "The minimum amount of the transactions (positive or zero)",
        required: true,
    })
    min: number;

    @ApiProperty({
        example: 456.78,
        description: "The maximum amount of the transactions (positive or zero)",
        required: true,
    })
    max: number;

    @ApiProperty({
        example: "2024-02-20T12:34:56.789Z",
        description: "The date and time of the transaction in ISO 8601 format",
        required: true,
    })
    timestamp: Date;
}