import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt } from 'node:crypto';
import { promisify } from 'node:util';
import { randomInt } from 'node:crypto'


@Injectable()
export class EncryptService {
    

    
    async encryptCardNumber(cardNumber: string) {
        const iv = randomBytes(16);
        const password = 'Password used to generate key';

        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);

        const textToEncrypt = cardNumber;
        const encryptedText = Buffer.concat([
        cipher.update(textToEncrypt),
        cipher.final(),
        ])

        return `${iv.toString('hex')}:${encryptedText.toString('base64')}`
    }

    async generateCardNumber() {
        let myCardNumber = '21'
        const needsFigures = 18
        for (let i = 0; i <= needsFigures; i++) {
            myCardNumber += randomInt(9);
        }
         return myCardNumber
    }
      
}
