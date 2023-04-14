import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        console.log("UserService contructor");
    }

    async findOne(username: string) {
        return this.userRepository.findOne({ where: { username: username }})
    }
}
