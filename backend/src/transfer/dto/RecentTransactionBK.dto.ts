import { IsDate, IsNumber, IsString } from "class-validator"

export class RecentTransactionDto {
    @IsNumber()
    id: number 
    
    @IsNumber()
    senderId: number

    @IsNumber()
    recipientId: number

    @IsString()
    url: string
    
    @IsString()
    method: string

    @IsNumber()
    statusCode: number

    @IsNumber()
    sumToSend: number

    @IsNumber()
    convertedSum: number

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date


    sender: SenderObjDto
    recipient: RecipientObjDto
}
export class SenderObjDto {
    @IsString()
    cardNumber: string
    userWallet: UserWalletDto
}
export class RecipientObjDto {
    @IsNumber()
    id: number

    @IsString()
    cardNumber: string 

    @IsDate()
    createdAt: Date
    userWallet: UserWalletDto
}
export class UserWalletDto {
    @IsString()
    firstName: string

    @IsString()
    surName: string
}
