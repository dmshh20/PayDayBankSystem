import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { SignUpDto } from './dto/SignUp.dto.js';
import { SignInDto } from './dto/SignIn.dto.js';

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
}
