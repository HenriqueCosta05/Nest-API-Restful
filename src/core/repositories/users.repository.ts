import { Repository } from "../base/repository";
import { UserEntity } from "../domain/entities/user.entity";

export abstract class UsersRepository extends Repository<UserEntity> {}