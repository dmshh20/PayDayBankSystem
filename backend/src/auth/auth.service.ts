import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {

    }

    async signUp(body: any) {
        const createUser = await this.prisma.user.create({
            data: {
                firstName: 'Artem',
                surName: 'Dmysh',
                email: 'ddssdfdsf@gmail.com',
                password: '2101'
            }
        })
        return createUser
    }

}
