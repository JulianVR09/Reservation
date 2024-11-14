import { IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(10)
    phone: string;
}
