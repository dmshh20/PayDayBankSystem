
import { Test } from '@nestjs/testing';
import { EncryptService } from './encrypt.service';
import { EncryptController } from './encrypt.controller';

describe('Encrypt Controller', () => {
  let encryptController: EncryptController;
  let encryptService: EncryptService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [EncryptController],
        providers: [{
            provide: EncryptService,
            useValue: {
                decryptCardNumber: jest.fn().mockResolvedValue({
                    cardNumber: '2141820083383670'
                })
            }
        }],
      }).compile();

    encryptService = moduleRef.get(EncryptService);
    encryptController = moduleRef.get(EncryptController);
  });

  describe('decrypt CardNumber' ,() => {
    it('function decryptCardNumber must contain a cardNumber',async () => {
        const dto = {
            cardNumber: '2141820083383670'
        }

        await encryptController.decryptCardNumber(dto)
        expect(encryptService.decryptCardNumber).toHaveBeenCalledWith(dto)
    })
  })
 
});
