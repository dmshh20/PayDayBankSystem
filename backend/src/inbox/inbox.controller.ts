import { Body, Controller, Get, ParseIntPipe, Post, Query } from '@nestjs/common';
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
  async filterCategories(@Query('type', ParseIntPipe) type: number) {
    return this.inboxService.filterCategories(type)
  }

  @Get('/letter')
  async findLetterUsingMailId(@Query('type') type: string) {
    return this.inboxService.findLetterUsingMailId(type)
  } 
}
