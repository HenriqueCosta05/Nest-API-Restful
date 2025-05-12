import { Body, Controller, Delete, HttpCode, Post } from '@nestjs/common';
import { CreateTransactionDto } from 'src/shared/dtos/transaction/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';
import { Http } from 'winston/lib/winston/transports';

@Controller('transactions')
export class TransactionsController {
    constructor(private createTransactionUseCase: CreateTransactionUseCase, private deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase) { }

    @HttpCode(201)
    @Post()
    createTransaction(@Body() transaction: CreateTransactionDto) {
        return this.createTransactionUseCase.execute(transaction);
    }

    @HttpCode(204)
    @Delete()
    deleteAllTransactions() {
        return this.deleteAllTransactionsUseCase.execute();
    }
}
