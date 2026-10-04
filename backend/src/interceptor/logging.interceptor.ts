
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor (
        private prisma: PrismaService,
        private encryptService: EncryptService
    ) {}
  intercept(
    context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest()
    const response = context.switchToHttp().getResponse()
    
    const { url, method } = request
    const { convertedSum, recipientCard, sumToDecrement, currency, recipientCurrency } = request.body
    
     const senderId = request.user?.id

    const getCardNumber = String(recipientCard).replace(/\s+/g, '')
        
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(async () => {
            const { statusCode } = response
            
            const recipientWallet = await this.prisma.wallet.findUnique({
                where: { cardIndex: String(getCardNumber)}})
            
            if (!recipientWallet) {
                throw new BadRequestException('User not found')
            }

            
            const senderWallet = await this.prisma.wallet.findFirst({
                where: {
                    userId: senderId,
                    currency: currency
                }
            })

            if (!senderWallet) {
                throw new BadRequestException('User Sender not found')

            }

            const payload = {
                        senderWalletId: Number(senderWallet?.id),
                        recipientWalletId: Number(recipientWallet.id),
                        url,
                        method,
                        statusCode,
                        convertedSum: convertedSum,
                        sumToSend: sumToDecrement,
                        senderCurrency: currency,
                        recipientCurrency: recipientCurrency
            }

            if (!payload) {
                throw new BadRequestException("Error in loggingTransactions")
            }

            await this.prisma.loggingTransaction.create({
                data: payload
            })
            

        console.log(`${Date.now() - now}ms`)

        }
        
        ),
      );
      
  }

}
