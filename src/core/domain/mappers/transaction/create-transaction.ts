import { Mapper } from "src/core/base/mapper";
import { CreatedTransactionDto } from "src/shared/dtos/transaction/created-transaction.dto";
import { TransactionEntity } from "../../entities/transaction.entity";

export class CreateTransactionMappper extends Mapper<CreatedTransactionDto, TransactionEntity> {

    public mapFrom(param: CreatedTransactionDto): TransactionEntity {
        const transaction = new TransactionEntity(param.amount, param.timestamp);

        transaction.id = param.id;
        transaction.amount = param.amount;
        transaction.timestamp = param.timestamp;

        return transaction;
    }

    public mapTo(param: TransactionEntity): CreatedTransactionDto {
        const transaction = new CreatedTransactionDto();
        transaction.id = param.id;
        transaction.amount = param.amount;
        transaction.timestamp = param.timestamp;
        
        return transaction;
    }
}