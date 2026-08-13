import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { EncryptService } from 'src/encrypt/encrypt.service';

@Module({
  controllers: [WalletController],
  providers: [WalletService, PrismaService, EncryptService],
})
export class WalletModule {}
