import { Mapper } from "src/core/base/mapper";
import { CreateUserDto } from "src/shared/dtos/user/create-user.dto";
import { UserEntity } from "../../entities/user.entity";

export class CreateUserMapper extends Mapper<CreateUserDto, UserEntity> {
    public mapFrom(param: CreateUserDto): UserEntity {
        const user = new UserEntity(param.name, param.email, param.password);

        user.id = param.id;
        user.name = param.name;
        user.email = param.email;

        return user;
    }

    public mapTo(param: UserEntity): CreateUserDto {
        const user = new CreateUserDto();
        user.id = param.id;
        user.name = param.name;
        user.email = param.email;

        return user;
    }
}