import { Test } from '@nestjs/testing';
import { TransferController } from './transfer.controller';
import { TransferService } from './transfer.service';
import { LoggingInterceptor } from 'src/interceptor/logging.interceptor';

describe('Transfer Controller', () => {
  let transferController: TransferController;
  let transferService: TransferService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [TransferController],
        providers: [{
            provide: TransferService,
            useValue: {
              transfer: jest.fn().mockResolvedValue({ success: true }),
            }
        }],
      })
    .overrideInterceptor(LoggingInterceptor)
    .useValue({}) 
    .compile();

    transferService = moduleRef.get(TransferService);
    transferController = moduleRef.get(TransferController);
  });

  

  describe('Transfer ' ,() => {
    it('it must have cardnumber and sum',async () => {
        const body = {
            cardNumber: '2141820083383670',
            sum: 1000
        }

        const getUser = {
            id: 1
        }

        if (!body.cardNumber && !body.sum) {
          throw new Error('cardNumber or Sum is undefined')
        }


        await transferController.transfer(body, getUser)
       expect(transferService.transfer).toHaveBeenCalledWith(body, getUser)
       expect(transferController)
    })
  })
 
});
