import { UseCase } from "src/core/base/use-case";
import { UsersRepository } from "src/core/repositories/users.repository";
import { CreatedUserDto } from "src/shared/dtos/user/created-user.dto";
import { CreateUserMapper } from "src/core/domain/mappers/user/create-user";
import { CreatedUserMapper } from "src/core/domain/mappers/user/created-user";

export class CreateUserUseCase implements UseCase<CreatedUserDto> {
    private createUserMapper: CreateUserMapper;
    private createdUserMapper: CreatedUserMapper;

    constructor(private readonly repository: UsersRepository) {
        this.createUserMapper = new CreateUserMapper();
        this.createdUserMapper = new CreatedUserMapper();
    }

    public async execute(data: CreatedUserDto): Promise<CreatedUserDto> {
        const user = this.createUserMapper.mapFrom(data);
        const createdUser = await this.repository.create(user);
        return this.createdUserMapper.mapTo(createdUser);
    }
}