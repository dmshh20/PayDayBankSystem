
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
    const { sumToSend, recipientCard } = request.body
    
    const senderId = request.user?.id

    
    const getCardNumber = String(recipientCard).replace(/\s+/g, '')
        
    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(async () => {
            const { statusCode } = response
            
            // const recipientId = await this.encryptService.hashingBlindIndex(getCardNumber)
            // console.log('RECIPIENt CHECK', recipientId)
            
            const existingCardNumber = await this.prisma.wallet.findUnique({
                where: { cardIndex: String(getCardNumber)}})
            
            if (!existingCardNumber) {
                throw new BadRequestException('User not found')
            }
            if (existingCardNumber) {
                await this.prisma.loggingTransaction.create({
                    data: {
                        senderId,
                        recipientId: Number(existingCardNumber.userId),
                        url,
                        method,
                        statusCode,
                        sum: sumToSend
                    }
                })
            }

        console.log(`${Date.now() - now}ms`)

        }
        
        ),
      );
      
  }

}
