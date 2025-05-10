import { UseCase } from "src/core/base/use-case";
import { CreateTransactionMappper } from "src/core/domain/mappers/transaction/create-transaction";
import { CreatedTransactionMappper } from "src/core/domain/mappers/transaction/created-transaction";
import { TransactionsRepository } from "src/core/repositories/transactions.repository";
import { CreatedTransactionDto } from "src/shared/dtos/transaction/created-transaction.dto";

export class CreateTransactionUseCase implements UseCase<CreatedTransactionDto> {
    private createTransactionMapper: CreateTransactionMappper;
    private createdTransactionMapper: CreatedTransactionMappper;

    constructor(private readonly repository: TransactionsRepository) {
        this.createTransactionMapper = new CreateTransactionMappper();
        this.createdTransactionMapper = new CreatedTransactionMappper();
    }

    public async execute(data: CreatedTransactionDto): Promise<CreatedTransactionDto> {
        const transaction = this.createTransactionMapper.mapFrom(data);
        const createdTransaction = await this.repository.create(transaction);
        return this.createdTransactionMapper.mapTo(createdTransaction);
    }
}