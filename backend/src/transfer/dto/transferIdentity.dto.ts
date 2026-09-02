import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class transferIdentityDto {
    @IsString()
    @IsNotEmpty()
    cardNumber: string

    @IsNumber()
    @IsNotEmpty()
    sum: number
}