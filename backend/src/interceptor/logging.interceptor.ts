
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
    const { sum, cardNumber} = request.body
    const userId = request.user?.id
   
    
    const getCardNumber = String(cardNumber).replace(/\s+/g, '')

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(async () => {
            const { statusCode } = response

            const recipientId = await this.encryptService.hashingBlindIndex(getCardNumber)
            const existingCardNumber = await this.prisma.user.findUnique({
                where: { cardIndex: String(recipientId)}})
            
            if (!existingCardNumber) {
                throw new BadRequestException('User not found')
            }
            if (existingCardNumber) {
                await this.prisma.loggingTransaction.create({
                    data: {
                        userId,
                        recipientId: Number(existingCardNumber.id),
                        url,
                        method,
                        statusCode,
                        sum
                    }
                })
            }
        console.log(`${Date.now() - now}ms`)

        }
        
        ),
      );
      
  }

}
