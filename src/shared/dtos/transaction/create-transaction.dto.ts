import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsDate, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreateTransactionDto {
    id?: string;

    @ApiProperty({
        example: 123.45,
        description: "The decimal amount of the transaction (positive or zero)",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    @Min(0, { message: "Amount must not be negative" })
    amount: number;

    @ApiProperty({
        example: "2024-02-20T12:34:56.789Z",
        description: "The date and time of the transaction in ISO 8601 format",
        required: true,
    })
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    timestamp: Date;
}