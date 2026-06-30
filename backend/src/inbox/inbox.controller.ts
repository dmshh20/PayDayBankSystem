import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { inboxDto } from './dto/inbox.dto';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post('')
  async sendInboxMessage(@Body() dto: inboxDto) {
    return this.inboxService.sendInboxMessage(dto)
  }
  
  @Get('/categories')
  async filterCategories(@Query('type') type: any) {
    return this.inboxService.filterCategories(type)
  }
}
