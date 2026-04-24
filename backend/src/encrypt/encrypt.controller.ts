import { Body, Controller, Get, Post } from '@nestjs/common';
import { EncryptService } from './encrypt.service';
import { decryptDto } from './dto/decrypt.dto';

@Controller('encrypt')
export class EncryptController {
  constructor(private readonly encryptService: EncryptService) {}

  @Post('/decrypt')
  async decryptCardNumber(@Body() body: decryptDto) {
    return this.encryptService.decryptCardNumber(body)
  }
}
