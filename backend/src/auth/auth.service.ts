import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/SignUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDto } from './decorator/getUser.dto';
import { Prisma } from 'generated/prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly encryptService: EncryptService
    ) {}

    async signUp(body: SignUpDto) {
         const existingUser = await this.prisma.user.findUnique({where: {email: body.email}})

        if (existingUser) {
            throw new BadRequestException('User has already exist')
        }
        
        const generatedCard = await this.encryptService.generateCardNumber()
        console.log('generatedCardNumber - ',generatedCard)
        
        const hashedCard = await this.encryptService.encryptCardNumber(generatedCard)
        
        const hashedPassword = await this.hashPassword(body.password)
        const hashedBlindIndex = await this.encryptService.hashingBlindIndex(generatedCard)
       try {

        const createUser = await this.prisma.user.create({
            data: {
                firstName: body.firstName,
                surName: body.surName,
                email: body.email,
                password: hashedPassword,

             userWallet: {
                create: {
                    cardNumber: hashedCard,
                    cardIndex: hashedBlindIndex,
                    balance: 0,
                    currency: body.currency
                }
             }
            },
            select: {
                id: true,
                firstName: true,
                surName: true,
                email: true,
                createdAt: true
            }
        })
      
        return createUser

       } catch(error: unknown) {
         if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2002") {
                throw new BadRequestException('User with this email already exist')
            }
        } 
        
        throw error 
       }
    }
    
    private async hashPassword(password: string) {
        const sugar = 10
        return await bcrypt.hash(password, sugar)

    }

    async signIn(body: SignInDto) {
         const existingUser = await this.prisma.user.findUnique({where: {email: body.email}})

        if (!existingUser) {
            throw new UnauthorizedException('Invalid email or password')
        }

        const isMatch = await bcrypt.compare(body.password, existingUser.password);

        if (!isMatch) {
            throw new BadRequestException('Passwords dont match')
        }
        const accessToken = this.jwt.sign({id: existingUser.id})
        return {
            access_token: accessToken
        }
    }

    async userMe(user: getUserDto) {
            const existingUser = await this.prisma.user.findUnique({where: {id: user.id}, include: { userWallet: true}})
            if (!existingUser) {
                throw new BadRequestException('Failed to get user data')
            }
           
            const {userWallet, ...clearnUser} = existingUser
        
            return existingUser
    }

}
