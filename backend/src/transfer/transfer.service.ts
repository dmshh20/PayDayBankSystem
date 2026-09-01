import { BadRequestException, Injectable } from '@nestjs/common';
import { transferDto } from './dto/transfer.dto';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDto } from 'src/auth/decorator/getUser.dto';
import { RecentTransactionDto } from './dto/RecentTransactionBK.dto';

@Injectable()
export class TransferService {
    constructor(
        private encryptService: EncryptService,
        private  prisma: PrismaService
    ) {}

    async transfer(body: any, user: getUserDto) {
            const existingCardNumber = body.recipientCard
            const existingSender = body.sender
            const convertedSum = Number(body.convertedSum)
            const sumToDecrement = Number(body.sumToDecrement)
            const userSender = body.sender
        
            // let currentSum = body.sum
            // let currentCardNumber = body.cardNumber.replace(/\D/g,'');

            // const hashCurrentCardNumber = await this.encryptService.hashingBlindIndex(currentCardNumber)
            
            // const existingCardNumber = await this.prisma.wallet.findUnique({where: {cardIndex: hashCurrentCardNumber}})
            // const existingSender = await this.prisma.user.findUnique({where: {id: user.id}})
            
            return await this.prisma.$transaction(async () => {

                const existingEnoughMoney = await this.prisma.wallet.findFirst({
                    where: {
                        userId: user.id
                    }
                })
                
                if (!existingEnoughMoney) {
                    throw new BadRequestException('User was not found')
                }
                if (existingEnoughMoney.balance < sumToDecrement) {
                  throw new BadRequestException("Insufficient funds")
                 }

                     
                await this.prisma.wallet.updateMany({
                    where: {
                        userId: user.id
                    },
                    data: {
                        balance: {
                            decrement: sumToDecrement
                        }
                    }
                })
                console.log('recipeintCard', body.recipientCard, convertedSum)
                await this.prisma.wallet.update({
                    where: {
                        cardIndex: body.recipientCard
                    }, data: {
                        balance: {
                            increment: convertedSum
                        }
                    }
                })
                return {message: "Money was sent successfully", userSender}
            })
    }

    async userIdentity(body: transferDto, user: getUserDto) {
        let sumToSend = body.sum
        let currentCardNumber = body.cardNumber.replace(/\D/g,'');

        const hashCurrentCardNumber = await this.encryptService.hashingBlindIndex(currentCardNumber)
            
        const existingCardNumber = await this.prisma.wallet.findUnique({where: {cardIndex: hashCurrentCardNumber}})
        const existingSender = await this.prisma.wallet.findUnique({where: {id: user.id}})
           
        if (!existingCardNumber || !existingSender) {
            throw new BadRequestException('Card or User is not found')
        }
        const senderBalance = await this.prisma.wallet.findFirst({where: {userId: user.id}})
        
        return {
            sumToSend: sumToSend,
            sender: existingSender,
            senderId: existingSender.id,
            recipientCard: existingCardNumber.cardIndex,
            recipientCurrency: existingCardNumber.currency,
            senderCurrency: existingSender.currency,
            balance: senderBalance?.balance
        }
    }


    async recentTransaction(user: getUserDto) {
            const senderId = user.id
    
            const recentTransaction = await this.prisma.loggingTransaction.findMany({
                take: 5,
                where: {
                   OR: [{recipientId: senderId},{senderId},]
                }, orderBy: { createdAt: 'desc' }
                , include: {
                    sender: {
                        
                        select: {cardNumber: true,
                            userWallet: {
                                select: {
                                  firstName: true, surName: true,
                                }
                            }
                        }
                    },
                    recipient: {
                        select: { id: true, cardNumber: true,  createdAt: true,
                        userWallet: {
                            select: {
                                firstName: true, surName: true
                            }
                        }
                    }}
                }
            })
            
             if (recentTransaction.length < 1 || recentTransaction === undefined) {
                return {message: 'have no transactions yet'}
            }
            
            const lastRecords = await Promise.all(
                
                recentTransaction.map(async (record: RecentTransactionDto) => {
                    
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
            
            if (!lastRecords) {
                throw new BadRequestException('Failed to get recent record transactions')
            }

            return lastRecords
    }
}
