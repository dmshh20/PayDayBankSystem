import { IsNotEmpty, IsString } from "class-validator";

export class decryptDto {
    @IsString()
    @IsNotEmpty()
    cardNumber: string
}