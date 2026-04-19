import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { randomInt } from 'node:crypto'
import { createHmac } from 'node:crypto'
import { decryptDto } from './dto/decrypt.dto';

@Injectable()
export class EncryptService {
        private readonly password = process.env.ENCRYPTION_PASSWORD as string
        private readonly salt = process.env.ENCRYPTION_SALT as string

    async encryptCardNumber(cardNumber: string) {
        const iv = randomBytes(16);
        const encrypt = await this.encryption(iv, cardNumber)

        return `${iv.toString('hex')}:${encrypt.toString('base64')}`
    }

    async getKey() {
        return (await promisify(scrypt)(this.password, this.salt, 32)) as Buffer;

    }

    async decryptCardNumber(body: decryptDto) {
        console.log(body);
        
        const [ivKey, cardNumber] = body.cardNumber.split(':')
        
        const iv = Buffer.from(ivKey, 'hex')
        const encryptedBuffer = Buffer.from(cardNumber, 'base64')
        const key = await this.getKey()
        const decipher = createDecipheriv('aes-256-ctr', key, iv);

        const decryptedText = Buffer.concat([
        decipher.update(encryptedBuffer),
        decipher.final(),
        ]);

        return decryptedText.toString('utf8')
    }

    private async encryption(iv: Buffer, cardNumber: string) {
            const key = await this.getKey()
            const cipher = createCipheriv('aes-256-ctr', key, iv);
            const textToEncrypt = cardNumber;
            const encryptedText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
            ])
            
            return encryptedText
        }

    async generateCardNumber() {
        let myCardNumber = '21'
        const needsFigures = 13
        for (let i = 0; i <= needsFigures; i++) {
            myCardNumber += randomInt(9);
        }
        
         return myCardNumber
    }

  async hashingBlindIndex(cardNumber: string) {
    const pepper = process.env.HASHING_PEPPER as string
    
    const combinedString = cardNumber + pepper
    
    const hash = createHmac('sha256', pepper)
                .update(combinedString)
                .digest('hex');

    return hash
  }
      
}
