import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { CreateTransactionDto } from 'src/shared/dtos/transaction/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
    constructor(
        private createTransactionUseCase: CreateTransactionUseCase,
        private deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase
    ) {}

    @ApiOperation({ summary: 'Create a new transaction' })
    @ApiResponse({ status: 201, description: 'Transaction created successfully' })
    @ApiResponse({ status: 400, description: 'Bad request - Invalid input' })
    @HttpCode(201)
    @Post()
    async createTransaction(@Body() transaction: CreateTransactionDto) {
        const result = await this.createTransactionUseCase.execute(transaction);
        return result; // Make sure this returns a complete object with all fields
    }

    @ApiOperation({ summary: 'Delete all transactions' })
    @ApiResponse({ status: 204, description: 'All transactions deleted' })
    @HttpCode(204)
    @Delete()
    async deleteAllTransactions() {
        return this.deleteAllTransactionsUseCase.execute();
    }
}