import { Entity } from "src/core/base/entity";

export class UserEntity extends Entity {
    name: string;
    email: string;
    password: string;

    constructor(name: string, email: string, password: string) {
        super();
        this.name = name;
        this.email = email;
        this.password = password;
    }
}