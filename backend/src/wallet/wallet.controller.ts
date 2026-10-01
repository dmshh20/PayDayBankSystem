import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { GetUser } from 'src/auth/decorator/getUser';
import { getUserDto } from 'src/auth/decorator/getUser.dto';
import { JwtGuard } from 'src/auth/guard/jwt-auth.guard';
import { WalletDto } from './dto/walletDto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @UseGuards(JwtGuard)
  @Get('')
  async getUserWallets(@GetUser() user: getUserDto) {
    return this.walletService.getUserWallets(user.id)
  }

  @UseGuards(JwtGuard)
  @Get('/info')
  async walletInfo(@Query('currency') currency: string, @GetUser() user: getUserDto) {
    return this.walletService.walletInfo(currency, user)
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  async createNewWallet(@GetUser() user: getUserDto,@Body() userNewWallet: WalletDto) {
    return this.walletService.createNewWallet(user.id, userNewWallet.userNewWallet)
  }
}
