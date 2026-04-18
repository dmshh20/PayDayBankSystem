import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TransferService } from './transfer.service';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { transferDto } from './dto/transfer.dto';
import { GetUser } from 'src/auth/decorator/getUser';
import { getUserDto } from 'src/auth/decorator/getUser.dto';

@Controller('transfer')
export class TransferController {
  constructor(private readonly transferService: TransferService) {}
  
  @UseGuards(JwtGuard)
  @Post('')
  async transfer(@Body() body: transferDto, @GetUser() user: getUserDto) {
    return this.transferService.transfer(body, user)
  }
}
