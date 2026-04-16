import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { SignUpDto } from './dto/SignUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUserDto } from './decorator/getUser.dto';
import { Prisma } from 'generated/prisma/client';
import { log } from 'node:console';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private readonly jwt: JwtService,
        private readonly encryptService: EncryptService
    ) {}

    async signUp(body: SignUpDto) {
       try {
        
         const existingUser = await this.prisma.user.findUnique({where: {email: body.email}})

        if (existingUser) {
            throw new BadRequestException('User has already exist')
        }
        
        const generatedCard = await this.encryptService.generateCardNumber()
        const hashedCard = await this.encryptService.encryptCardNumber(generatedCard)
        const hashedPassword = await this.hashPassword(body.password)
        
        const createUser = await this.prisma.user.create({
            data: {
                firstName: body.firstName,
                surName: body.surName,
                email: body.email,
                password: hashedPassword,
                cardNumber: hashedCard,
                cardIndex: hashedCard
            }, select: {
                firstName: true,
                surName: true,
                email: true,
                createdAt: true
            }
        })
        return createUser

       } catch(error: any) {
        log('MY ERROR', error);
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
       try {
         const existingUser = await this.prisma.user.findUnique({where: {email: body.email}})

        if (!existingUser) {
            throw new BadRequestException('User doesnt exist')
        }

        const isMatch = await bcrypt.compare(body.password, existingUser.password);

        if (!isMatch) {
            throw new BadRequestException('Passwords dont match')
        }
        const accessToken = this.jwt.sign({id: existingUser.id})
        return {
            access_token: accessToken
        }

       } catch(error: any) {
             if (error instanceof Prisma.PrismaClientKnownRequestError) {
                if (error.code === "P2001") {
                    throw new BadRequestException('User doesnt exist')
                }
            }
            throw error;
       }
    }

    async userMe(user: getUserDto) {
        try {
            const existingUser = await this.prisma.user.findUnique({where: {id: user.id}})
            if (!existingUser) {
                throw Error('')
            }
           
            const {password, cardNumber, ...clearnUser} = existingUser

            return clearnUser
        } catch(error: any) {
            throw new InternalServerErrorException('Failed get user information')
            
        }
    }

}
