import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [InboxController],
  providers: [InboxService, PrismaService],
})
export class InboxModule {}
