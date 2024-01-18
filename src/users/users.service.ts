import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    findAll() {
        return 'All users in the databank.';
    }

    findByEmail(email) {
        return `user with email ${email}`;
    }

    create(createUserDto) {
        return createUserDto;
    }

    delete(email) {
        return `user with email ${email} has been deleted.`;
    }

    update(email, updateUserDto) {
        return `user with email ${email} has been updated with ${updateUserDto}`;
    }
}
