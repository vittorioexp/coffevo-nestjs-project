import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, Max, Min } from "class-validator";

export class RateCoffeeDto {
    @ApiProperty({ description: 'The rate of a coffee', minimum: 1, maximum: 5 })
    @IsInt({ message: 'Rate must be an integer' })
    @Min(1, { message: 'Rate must be at least 1' })
    @Max(5, { message: 'Rate must be at most 5' })
    readonly rate: number;

    @ApiProperty({ description: 'The description of a rate', nullable: true })
    @IsString()
    @IsOptional()
    readonly description?: string;
}
