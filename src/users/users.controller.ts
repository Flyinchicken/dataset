import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UsersService } from './users.service';

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
    create(createUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Delete(':email')
    delete(@Param("email") email: string) {
        return this.usersService.delete(email);
    }

    @Patch(':email')
    update(@Param("email") email, @Body() updateUserDto) {
        return `user with email ${email} has been updated with ${updateUserDto}`;
    }
}
