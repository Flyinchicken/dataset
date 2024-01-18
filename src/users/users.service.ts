import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { InjectPrismaClient } from 'src/prisma/prisma.decorators';

@Injectable()
export class UsersService {
    // Inject prisma service into UserService, so we can access the prisma service to query the database
    constructor(@InjectPrismaClient() private readonly prisma) { }

    async findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: userWhereUniqueInput
        });

        if (!user) {
            throw new NotFoundException();
        }
        return user;
    }

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async createUser(data: Prisma.UserCreateInput): Promise<User> {
        const user = await this.prisma.user.findUnique({
            where: {
                email: data.email
            }
        });

        if (user) {
            throw new ConflictException();
        }

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
