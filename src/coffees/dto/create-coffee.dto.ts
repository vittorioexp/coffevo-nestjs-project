import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsString } from "class-validator";

export class CreateCoffeeDto {
    @ApiProperty({ description: 'The name of a coffee' })
    @IsString()
    readonly name: string;

    @ApiProperty({ description: 'The brand of a coffee' })
    @IsString()
    readonly brand: string;

    @ApiProperty({ description: 'The state of a coffee', default: false, required: false })
    @IsBoolean()
    readonly isPublished?: boolean = false;

    @ApiProperty({ example: [] })
    @IsString({each: true})
    readonly flavors: string[];
}
