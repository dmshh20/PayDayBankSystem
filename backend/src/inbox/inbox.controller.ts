import { Body, Controller, Post } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { inboxDto } from './dto/inbox.dto';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post('')
  async sendInboxMessage(@Body() dto: inboxDto) {
    return this.inboxService.sendInboxMessage(dto)
  }
}
