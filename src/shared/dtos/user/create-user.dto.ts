import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    id?: string;

    @ApiProperty({
        example: "John Doe",
        description: "The name of the user",
        required: true,
    })
    name: string;

    @ApiProperty({
        example: "john@example.com",
        description: "The email of the user",
        required: true,
    })
    email: string;

    @ApiProperty({
        example: "password123!",
        description: "The password of the user",
        required: true,
    })
    password: string;
}