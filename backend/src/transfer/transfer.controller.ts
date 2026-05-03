import { Body, Controller, Get, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { transferDto } from './dto/transfer.dto';
import { GetUser } from 'src/auth/decorator/getUser';
import { getUserDto } from 'src/auth/decorator/getUser.dto';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
  
  @UseInterceptors(LoggingInterceptor)
  @UseGuards(JwtGuard)
  @Post('')
  async transfer(@Body() body: transferDto, @GetUser() user: getUserDto) {
    return this.transferService.transfer(body, user)
  }

  @Get('/recent')
  @UseGuards(JwtGuard)
  async recentTransaction(@GetUser() user: getUserDto) {
    return this.transferService.recentTransaction(user)
  }
  
}
