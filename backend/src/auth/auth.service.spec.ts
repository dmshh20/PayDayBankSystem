import { Test } from "@nestjs/testing";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

describe('Auth Service', () => {
    let authController: AuthController;
    let authService: AuthService;


    beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        controllers: [AuthController],
        providers: [{
            provide: AuthService,
            useValue: {
                signUp: jest.fn().mockResolvedValue({
                    firstName: "Artem",
                    surName: "Dmysh",
                    email: "dmshh12@gmail.com",
                })          
                
            }
        }],
      }).compile();


    authController = moduleRef.get(AuthController);
    authService = moduleRef.get(AuthService);
  });

  describe('If Auth Service is returned correct',() => {
    it('the result must be without password', async () => {
        const dto = {
                    firstName: "Artem",
                    surName: "Dmysh",
                    email: "dmshh12@gmail.com",
                    password: "1111"
        }

        const result = await authService.signUp(dto)
        
        expect(result).not.toHaveProperty('password')
        expect(result).toEqual({
            firstName: "Artem",
            surName: "Dmysh",
            email: "dmshh12@gmail.com",
        })
    })
  })


})