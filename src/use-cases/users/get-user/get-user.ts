import { UseCase } from "src/core/base/use-case";
import { CreatedUserMapper } from "src/core/domain/mappers/user/created-user";
import { UsersRepository } from "src/core/repositories/users.repository";
import { CreatedUserDto } from "src/shared/dtos/user/created-user.dto";

export class GetUserUseCase implements UseCase<CreatedUserDto> {
    private createdUserMapper: CreatedUserMapper;

    constructor(private readonly repository: UsersRepository) {
        this.createdUserMapper = new CreatedUserMapper();
    }

    public async execute(data: CreatedUserDto): Promise<CreatedUserDto> {
        const user = this.createdUserMapper.mapFrom(data);
        const userEntity = await this.repository.getById(user.id as string);
        return this.createdUserMapper.mapTo(userEntity);
    }
}