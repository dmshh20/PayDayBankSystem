import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/SignIn.dto';
import { SignUpDto } from './dto/SignUp.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorator/getUser';
import { JwtGuard } from './guard/local-auth.guard';

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
  async userMe(@GetUser() user: any) {
    return this.authService.userMe(user)
  }
}
