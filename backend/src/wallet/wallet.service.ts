import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
import { getUserDto } from 'src/auth/decorator/getUser.dto';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class WalletService {
    constructor(
        private prisma: PrismaService,
        private encryptService: EncryptService
    ) {}

    async getUserWallets(userId: number) {
        const wallets = await this.prisma.wallet.findMany({
          where: {
            userId
          },include: {
            userWallet: {
                select: {
                    firstName: true, surName: true
                }
            }
          }
        })
        
        return wallets
    }

    async walletInfo(currency: string, user: getUserDto) {
        
        const wallet = await this.prisma.wallet.findFirst({
            where: {
                userId: user.id,
                currency
            },
            //  include: {
            //     userWallet: {
            //         select: {
            //             firstName: true,
            //             surName: true
            //         }
            //     }
            //    }
        })
        
        return wallet
    }


    async createNewWallet(userId: number, userNewWallet: string) {

        const availabilityUserNewWallet = await this.prisma.wallet.findFirst({
            where: {currency: userNewWallet, userId: userId}
        })
        
        if (availabilityUserNewWallet?.currency === userNewWallet) {
            throw new BadRequestException({
                message: 'You have already had this wallet'
            })
        }

        const generatedCard = await this.encryptService.generateCardNumber()
        const hashedCard = await this.encryptService.encryptCardNumber(generatedCard)
        const hashedBlindIndex = await this.encryptService.hashingBlindIndex(generatedCard)

            const createNewUserWallet = await this.prisma.wallet.create({
                data: {
                        cardNumber: hashedCard,
                        cardIndex: hashedBlindIndex,
                        balance: 0,
                        currency: userNewWallet,
                        userId: userId
                }
            })

            if (!createNewUserWallet) {
                throw new BadRequestException('Failed to create New Wallet')
            }

        return createNewUserWallet
        
    }
}
