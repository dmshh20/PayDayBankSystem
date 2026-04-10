import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import 'dotenv/config'


@Module({
  imports: [
     JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET as string,
      signOptions: { expiresIn: '2h' },
    }),
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, EncryptService],  
})

export class AuthModule {}
