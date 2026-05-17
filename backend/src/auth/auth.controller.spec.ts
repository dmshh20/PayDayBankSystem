import { Test } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"

describe('Auth Controller',() => {
    let authController: AuthController
    let authService: AuthService

    beforeEach(async () => {
       const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [
            {
                provide: AuthService,
                useValue: {
                   signUp: jest.fn().mockResolvedValue({
                        firstName: 'Artem',
                        surName: 'Dmysh',
                        email: 'dmshh12@gmail.com',
                        password: '$2b$10$mockhash'
                   })
                }
            }
        ],
      }).compile();

        authService = moduleRef.get(AuthService);
        authController = moduleRef.get(AuthController);
    })

    describe('Save User in DB', () => {
        it('sign up', async () => {
            const dto = {
                firstName: 'Artem',
                surName: 'Dmysh',
                email: 'dmshh12@gmail.com',
                password: '1111'
            }
            
            await authController.signUp(dto)

            expect(authService.signUp).toHaveBeenCalledWith(dto);
        })
    })

   
})