import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { inboxDto } from './dto/inbox.dto';
import { log } from 'node:console';
@Injectable()
export class InboxService {
    constructor(private prisma: PrismaService) {
    }

 

  async makeid(length) {
      var result           = '';
      var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

  async sendInboxMessage(dto: inboxDto) {
    return this.prisma.inbox.create({
        data: {
            id: dto.id,
            userId: dto.userId,
            topic: dto.topic,
            message: dto.message, 
            type: dto.type,
            mailId: String(await this.makeid(20))
        }
    })
  }

  async filterCategories(type: number, userId: any) {
    const messages = await this.prisma.inbox.findMany({
       where: {
        type: type
       }
    })

    return messages.filter((record) => record.userId === userId)
  }

  async findLetterUsingMailId(mailId: string) {
     const messages = await this.prisma.inbox.findFirst({
       where: {
        mailId: mailId
       }
    })
        return messages
    }
}
