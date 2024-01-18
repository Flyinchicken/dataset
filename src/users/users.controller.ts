import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':email')
    findByEmail(@Param("email") email: string) {
        return this.usersService.findByEmail(email);
    }

    @Post('create')
    async signupUser(
        @Body() userData: { email: string; name?: string; address?: string; },
    ): Promise<User> {
        return this.usersService.signupUser(userData);
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
