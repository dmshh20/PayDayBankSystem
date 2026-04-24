import { Module } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { TransferController } from './transfer.controller';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [TransferController],
  providers: [TransferService, EncryptService, PrismaService],
})
export class TransferModule {}
