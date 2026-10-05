import { IsString } from "class-validator";

export class UserWalletInfoDto {
    @IsString()
    currency: string
}