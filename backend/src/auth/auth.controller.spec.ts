import { Test } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

describe('Auth Controller', () => {
  let controller: AuthController
  let service: AuthService

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { 
          provide: AuthService,
          useValue: {
            signUp: jest.fn().mockResolvedValue({
                firstName: 'Artem',
                surName: 'Dmysh',
                email: 'artem@gmail.com',
                createdAt: 'time'
            })
          }
        }
      ]
    }).compile()

    controller = module.get(AuthController)
    service = module.get(AuthService)
  })

  describe('controller', () => {
    it('if the data exists in controller',async() => {
      const mockReq = {
        firstName: 'Artem',
        surName: 'Dmysh',
        email: 'artem@gmail.com',
        password: '1111',
    }

    await controller.signUp(mockReq)

    expect(service.signUp).toHaveBeenCalledWith(mockReq)
    })
  })

})