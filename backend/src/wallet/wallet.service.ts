import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma } from 'generated/prisma/client';
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


    async createNewWallet(userId: number, userNewWallet: string) {
        const availabilityUserNewWallet = await this.prisma.wallet.findFirst({
            where: {userId: userId, currency: userNewWallet}
        })
        
        if (availabilityUserNewWallet?.currency === userNewWallet) {
            throw new BadRequestException({
                message: "You have already had this currency wallet"
            })
        }

        const generatedCard = await this.encryptService.generateCardNumber()
        const hashedCard = await this.encryptService.encryptCardNumber(generatedCard)
        const hashedBlindIndex = await this.encryptService.hashingBlindIndex(generatedCard)

        try {
            const createNewUserWallet = await this.prisma.wallet.create({
                data: {
                        cardNumber: hashedCard,
                        cardIndex: hashedBlindIndex,
                        balance: 0,
                        currency: userNewWallet,
                        userId: userId
                }
            })

        return createNewUserWallet
        } catch(error: unknown) {
            if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new InternalServerErrorException('a user with this credentials already exists')
                }
            }
            throw error
        }
    }
}
