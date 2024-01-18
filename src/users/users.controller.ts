import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { Prisma, User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findUnique(@Body() userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
        return this.usersService.findUnique(userWhereUniqueInput);
    }

    @Get('all')
    findAll() {
        return this.usersService.findAll();
    }

    @Post('create')
    async createUser(
        @Body() userData: { email: string; name?: string; address?: string; },
    ): Promise<User> {
        return this.usersService.createUser(userData);
    }

    @Delete(':email')
    async deleteUser(@Param('email') email: string): Promise<User> {
        return this.usersService.deleteUser({ email: email });
    }

    @Patch(':email')
    update(@Param("email") email, @Body() updateUserDto) {
        return `user with email ${email} has been updated with ${updateUserDto}`;
    }
}
