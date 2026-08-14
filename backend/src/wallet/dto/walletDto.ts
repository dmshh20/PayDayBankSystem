import { IsString } from "class-validator";

export class WalletDto {
    @IsString()
    userNewWallet: string
}