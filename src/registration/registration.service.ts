import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class RegistrationService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ) {
        console.log("RegistrationService contructor");
    }

    async registerUser(username: string, pwd: string) {        
        // Check if the username is already taken
        const existingUser = await this.userRepository.findOne({ where: { username: username }});

        if (existingUser) {
            throw new ConflictException('Username already taken');
        }

        const encryptedPassword = crypto.createHash('sha256').update(pwd).digest('hex');

        const user = await this.userRepository.save({ username, password: encryptedPassword });
        
        const payload = { username: username, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
