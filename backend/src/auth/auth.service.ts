import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/SignUp.dto';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/SignIn.dto';
import { JwtService } from '@nestjs/jwt';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { PrismaService } from 'src/prisma/prisma.service';

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
        const hashedCard = await this.encryptService.encryptCardNumber(generatedCard)
        
        const hashedPassword = await this.hashPassword(body.password)
        const createUser = await this.prisma.user.create({
            data: {
                firstName: body.firstName,
                surName: body.surName,
                email: body.email,
                password: hashedPassword,
                cardNumber: hashedCard
            }, select: {
                firstName: true,
                surName: true,
                email: true,
                createdAt: true
            }
        })
        return createUser
    }
    
    private async hashPassword(password: string) {
        const sugar = 10
        return await bcrypt.hash(password, sugar)

    }

    async signIn(body: SignInDto) {
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
    }

}
