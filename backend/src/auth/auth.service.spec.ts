import { Test } from "@nestjs/testing"
import { AuthController } from "./auth.controller"
import { AuthService } from "./auth.service"
import * as bcrypt from 'bcrypt';
import { PrismaService } from "src/prisma/prisma.service";

  jest.mock('bcrypt', () => ({
        hash: jest.fn().mockResolvedValue('hashed_password_123'),
        compare: jest.fn().mockResolvedValue(true),
    }));

describe('Auth Service',() => {
    let controller: AuthController
    let service: AuthService
    let prisma: PrismaService

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

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            
            providers: [
                AuthService,
                {
                provide: PrismaService,
                useValue: {
                    user: {
                    hashPassword: jest.fn().mockResolvedValue({id: 1})
                    }
                }
            }
            ]
        }).compile()

        prisma = module.get(AuthService)
    })
  

    describe('',() => {
        it('should hash the password before saving to the database', async () => {
        const rawPassword = 'mySecretPassword123';
        const mockDto = {
            email: 'artem@gmail.com',
            password: rawPassword,
            firstName: 'Artem',
            surName: 'Dmysh'
        };

        // 1. Run the service method
        await service.signUp(mockDto);

        // 2. THE CHECK: Did we call bcrypt.hash with the raw password?
        // We check if the "Spy" saw the raw password and a "salt" (usually 10)
        expect(bcrypt.hash).toHaveBeenCalledWith(rawPassword, 10);
    });
    })
    

})