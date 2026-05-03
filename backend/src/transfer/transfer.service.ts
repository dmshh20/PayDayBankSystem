import { BadRequestException, Injectable } from '@nestjs/common';
import { transferDto } from './dto/transfer.dto';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDto } from 'src/auth/decorator/getUser.dto';

@Injectable()
export class TransferService {
    constructor(
        private encryptService: EncryptService,
        private  prisma: PrismaService
    ) {}

    async transfer(body: transferDto, user: getUserDto) {
        try {
            let currentSum = body.sum
            let currentCardNumber = body.cardNumber.replace(/\D/g,'');

            const hashCurrentCardNumber = await this.encryptService.hashingBlindIndex(currentCardNumber)
            
            const existingCardNumber = await this.prisma.user.findUnique({where: {cardIndex: hashCurrentCardNumber}})
            const existingSender = await this.prisma.user.findUnique({where: {id: user.id}})
             
            if (!existingCardNumber || !existingSender) {
                throw new BadRequestException('Card or User is not found')
            }

            
            return await this.prisma.$transaction(async () => {
                const existingEnoughMoney = await this.prisma.user.findUnique({
                    where: {
                        id: existingSender.id
                    }
                })
                
                if (!existingEnoughMoney) {
                    throw new BadRequestException('User was not found')
                }
                if (existingEnoughMoney.balance < currentSum) {
                    throw new BadRequestException("Insufficient funds")
                 }
                 
                const sender = await this.prisma.user.update({
                    where: {
                        id: existingSender.id
                    },
                    data: {
                        balance: {
                            decrement: currentSum
                        }
                    }
                })
                
                await this.prisma.user.update({
                    where: {
                        cardIndex: existingCardNumber.cardIndex
                    }, data: {
                        balance: {
                            increment: currentSum
                        }
                    }
                })
                return {message: "Money was sent successfully", sender}
            })
        } catch(error: any) {
            throw new BadRequestException('Failed during transfer')            
        }

    }

    async recentTransaction(user: getUserDto) {
        try {
            const senderId = user.id
            
            const recentTransaction = await this.prisma.loggingTransaction.findMany({
                take: 5,
                where: {
                   OR: [{recipientId: senderId},{senderId},]
                }, orderBy: { createdAt: 'desc' }
                , include: {
                    sender: {
                        select: { firstName: true, surName: true, cardNumber: true,
                        }
                    },
                    recipient: {
                        select: { id: true, cardNumber: true, firstName: true, surName: true, createdAt: true
                        }
                    }
                }
            })

            
             if (recentTransaction.length < 1 || recentTransaction === undefined) {
                return {message: 'have no transactions yet'}
            }
            
            const lastRecords = await Promise.all(
                recentTransaction.map(async (record: any) => {

                const decryptRecipient = await this.encryptService.decryptCardNumber(
                    {cardNumber: record.recipient?.cardNumber})


                const decryptSender = await this.encryptService.decryptCardNumber(
                    {cardNumber: record.sender?.cardNumber})


                    return {
                        ...record,
                        recipientLastFour: decryptRecipient.slice(-4),
                        senderLastFour: decryptSender.slice(-4)
                    }

                })
            )


            return {lastRecords}
        } catch(error: any) {
            throw new Error('Failed in RecentTransactions function')            
        }
    }
}
