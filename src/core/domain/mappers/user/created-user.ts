import { Mapper } from "src/core/base/mapper";
import { UserEntity } from "../../entities/user.entity";
import { CreatedUserDto } from "src/shared/dtos/user/created-user.dto";

export class CreatedUserMapper extends Mapper<CreatedUserDto, UserEntity> {
    public mapFrom(param: CreatedUserDto): UserEntity {
        const user = new UserEntity(param.name, param.email, param.password);

        user.id = param.id;
        user.name = param.name;
        user.email = param.email;

        return user;
    }

    public mapTo(param: UserEntity): CreatedUserDto {
        const user = new CreatedUserDto();
        user.id = param.id;
        user.name = param.name;
        user.email = param.email;

        return user;
    }
}