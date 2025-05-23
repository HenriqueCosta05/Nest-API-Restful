import { Mapper } from "src/core/base/mapper";
import { TransactionEntity } from "../../entities/transaction.entity";
import { CreateTransactionDto } from "src/shared/dtos/transaction/create-transaction.dto";

export class CreateTransactionMappper extends Mapper<CreateTransactionDto, TransactionEntity> {

    public mapFrom(param: CreateTransactionDto): TransactionEntity {
        const transaction = new TransactionEntity(param.amount, param.timestamp);

        transaction.id = param.id;
        transaction.amount = param.amount;
        transaction.timestamp = param.timestamp;

        return transaction;
    }

    public mapTo(param: TransactionEntity): CreateTransactionDto {
        const transaction = new CreateTransactionDto();
        transaction.id = param.id;
        transaction.amount = param.amount;
        transaction.timestamp = param.timestamp;
        
        return transaction;
    }
}