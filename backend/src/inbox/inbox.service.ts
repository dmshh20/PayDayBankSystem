import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { inboxDto } from './dto/inbox.dto';
@Injectable()
export class InboxService {
    constructor(private prisma: PrismaService) {
    }

  async sendInboxMessage(dto: inboxDto) {
    return this.prisma.inbox.create({
        data: {
            id: dto.id,
            userId: dto.userId,
            topic: dto.topic,
            message: dto.message, 
            type: dto.type
        }
    })
  }

  async filterCategories(type: any) {
    const messages = await this.prisma.inbox.findMany({
       where: {
        type: Number(type)
       }
    })


    return messages
  }

}
