import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class transferDto {
    @IsString()
    @IsNotEmpty()
    cardNumber: string

    @IsNumber()
    @IsNotEmpty()
    sum: number
}