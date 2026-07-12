import { Body, Controller, Get, ParseIntPipe, Post, Query, Req, Request, UseGuards } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { inboxDto } from './dto/inbox.dto';
import { GetUser } from 'src/auth/decorator/getUser';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { getUserDto } from 'src/auth/decorator/getUser.dto';

@Controller('inbox')
export class InboxController {
  constructor(private readonly inboxService: InboxService) {}

  @Post('')
  async sendInboxMessage(@Body() dto: inboxDto) {
    return this.inboxService.sendInboxMessage(dto)
  }
  
  @UseGuards(JwtGuard)
  @Get('/categories')
  async filterCategories(@Query('type', ParseIntPipe) type: number, @GetUser() user: getUserDto) {
    return this.inboxService.filterCategories(type, user.id)
  }

  @UseGuards(JwtGuard)
  @Get('/letter')
  async findLetterUsingMailId(@Query('type') type: string, @GetUser() user: getUserDto) {
    return this.inboxService.findLetterUsingMailId(type, user.id)
  } 
}
