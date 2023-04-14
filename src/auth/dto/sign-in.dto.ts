import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SignInDto {
    @ApiProperty({ description: 'The username of a user' })
    @IsString()
    readonly username: string;

    @ApiProperty({ description: 'The password of a user' })
    @IsString()
    readonly password: string;
}
