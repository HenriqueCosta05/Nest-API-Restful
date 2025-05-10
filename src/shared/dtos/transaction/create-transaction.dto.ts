import { ApiProperty } from "@nestjs/swagger";

export class CreateTransactionDto {
    id?: string;

    @ApiProperty({
        example: 123.45,
        description: "The decimal amount of the transaction (positive or zero)",
        required: true,
    })
    amount: number;


    @ApiProperty({
        example: "2024-02-20T12:34:56.789Z",
        description: "The date and time of the transaction in ISO 8601 format",
        required: true,
    })
    timestamp: Date;
}