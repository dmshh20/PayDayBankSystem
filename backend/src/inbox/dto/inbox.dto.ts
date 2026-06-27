import { IsEnum, IsNumber, IsString } from "class-validator"

export enum Types {
    PRIMARY = 0,
    BILLS = 1
}

export class inboxDto {
    @IsNumber()
    id: number

    @IsNumber()
    userId: number

    @IsString()
    message: string

    @IsString()
    topic: string
    
    @IsEnum(Types)
    type: Types 
}

