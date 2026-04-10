import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @IsNotEmpty()
    @IsString()
    firstName: string

    @IsNotEmpty()
    @IsString()
    surName: string

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}