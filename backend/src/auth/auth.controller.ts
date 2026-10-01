import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { GetUser } from './decorator/getUser';
import { JwtGuard } from './guard/jwt-auth.guard';
import { getUserDto } from './decorator/getUser.dto';
import { UserWalletInfoDto } from './dto/userWalletInfo.dto';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body)
  }

  @Post('/signin')
  async signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body)
  }

  @Get('/me')
  @UseGuards(JwtGuard)
  async userMe(@GetUser() user: getUserDto) {
    return this.authService.userMe(user)
  }

  @Get('/userWallet')
  @UseGuards(JwtGuard)
  async userWallet(@GetUser() user: getUserDto, @Query() userData: UserWalletInfoDto) {
    return this.authService.userWallet(user, userData)
  }
}
