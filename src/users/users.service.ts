import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { InjectPrismaClient } from 'src/prisma/prisma.decorators';

@Injectable()
export class UsersService {
    // Inject prisma service into UserService, so we can access the prisma service to query the database
    constructor(@InjectPrismaClient() private readonly prisma) { }

    findAll() {
        return 'New All users in the databank.';
    }

    findByEmail(email) {
        return `user with email ${email}`;
    }

    async signupUser(data: Prisma.UserCreateInput): Promise<User> {
        return this.prisma.user.create({
            data,
        });
    }

    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }

    update(email, updateUserDto) {
        return `user with email ${email} has been updated with ${updateUserDto}`;
    }
}
