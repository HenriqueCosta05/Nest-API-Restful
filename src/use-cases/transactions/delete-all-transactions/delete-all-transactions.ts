import { UseCase } from "src/core/base/use-case";
import { CreatedTransactionMappper } from "src/core/domain/mappers/transaction/created-transaction";
import { TransactionsRepository } from "src/core/repositories/transactions.repository";
import { CreatedTransactionDto } from "src/shared/dtos/transaction/created-transaction.dto";

export class DeleteAllTransactionsUseCase implements UseCase<CreatedTransactionDto[]> {

    constructor(private readonly repository: TransactionsRepository) {}

    public async execute(): Promise<void> {
        const transactions = await this.repository.getAll();
        await this.repository.deleteAll(transactions);
    }
}