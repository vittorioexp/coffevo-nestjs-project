import { Body, Controller, Post } from '@nestjs/common';
import { RegistrationService } from './registration.service';
import { Public } from 'src/common/decorators/public.decorators';
import { SignUpDto } from './dto/sign-up.dto';

@Public()
@Controller({ path: 'registration', version: '1' })
export class RegistrationController {
    constructor(
        private readonly registrationService: RegistrationService,
    ) {}

    @Post('do')
    async registration(@Body() signUpDto: SignUpDto) {
        console.log(`Registration of user '${signUpDto.username}' in progress.`);
        return await this.registrationService.registerUser(signUpDto.username, signUpDto.password);
    }
}
