import { IsDate, IsNumber, IsString } from "class-validator"

export class transferDto {
    @IsNumber()
    sumToDecrement: number

    @IsNumber()
    convertedSum: number

    sender: transferSenderDto

    @IsString()
    recipientCard: string

    @IsString()
    recipientCurrency: string
}

export class transferSenderDto {
    @IsNumber()
    id: number
    
    @IsNumber()
    userId: number

    @IsString()
    cardNumber: string

    @IsString()
    cardIndex: string

    @IsString()
    currency: string

    @IsNumber()
    balance: number

    @IsDate()
    createdAt: Date

    @IsDate()
    updatedAt: Date
}
