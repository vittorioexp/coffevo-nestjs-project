import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
    @ApiProperty({ description: 'The username of a user' })
    @IsString()
    readonly username: string;

    @ApiProperty({ description: 'The password of a user' })
    @IsString()
    @MinLength(8, { message: 'Password must be at least 8 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*\d).+$/, {
      message: 'Password must contain at least one uppercase letter and one number',
    })
    readonly password: string;
}
