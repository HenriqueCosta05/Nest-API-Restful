import { Body, Controller, Delete, Post } from '@nestjs/common';
import { CreateTransactionDto } from 'src/shared/dtos/transaction/create-transaction.dto';
import { CreateTransactionUseCase } from 'src/use-cases/transactions/create-transaction/create-transaction';
import { DeleteAllTransactionsUseCase } from 'src/use-cases/transactions/delete-all-transactions/delete-all-transactions';

@Controller('transactions')
export class TransactionsController {
    constructor(private createTransactionUseCase: CreateTransactionUseCase, private deleteAllTransactionsUseCase: DeleteAllTransactionsUseCase) { }

    @Post()
    createTransaction(@Body() transaction: CreateTransactionDto) {
        return this.createTransactionUseCase.execute(transaction);
    }

    @Delete()
    deleteAllTransactions() {
        return this.deleteAllTransactionsUseCase.execute();
    }
}
