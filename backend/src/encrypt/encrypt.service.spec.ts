import { EncryptService } from "./encrypt.service";
import { Test } from "@nestjs/testing";
import { decryptDto } from "./dto/decrypt.dto";
import { ConfigService } from "@nestjs/config";

describe('decrypt card number',() => {
    let encryptService: EncryptService

    beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
       providers: [
            EncryptService,
            {
                provide: ConfigService, 
                useValue: {
                    get: jest.fn((key: string) => {
                        if (key === 'ENCRYPTION_PASSWORD') return 'my-test-password';
                        if (key === 'ENCRYPTION_SALT') return 'my-test-salt';
                        return null;
                    }),
                },
            },
        ],
      }).compile();

    encryptService = moduleRef.get(EncryptService);
  });

  describe('checking correct card decryption', () => {
    it('should have a correct valid cardnumber with ivKey and cardNumber', async () => {
        const mockDto: decryptDto = {
            cardNumber: '76bac4af19634bf32c24401deec5ca78:bzXFgxUNIcC3hXstB7pZJg=='
        }
        
        const decrypting = await encryptService.decryptCardNumber(mockDto)

        expect(decrypting).toBeDefined()
        expect(decrypting.length).toBe(16)
        expect(decrypting).toString()
    })
  })

})
