import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Public } from '../common/decorators/public.decorators';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { Protocol } from '../common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}

    @Get('flavors')
    @Public()
    @ApiForbiddenResponse({ description: 'Forbidden.' })
    async findAll(@Protocol('https') protocol: string, @Query() paginationQuery: PaginationQueryDto) {
        console.log(protocol);
        return this.coffeeService.findAll(paginationQuery);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        console.log(id);
        const coffee = this.coffeeService.findOne(id);
        return coffee;
    }

    @Post()
    create(@Body() createCoffeeDto: CreateCoffeeDto) {
        return this.coffeeService.create(createCoffeeDto);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
        return this.coffeeService.update(id, updateCoffeeDto);
    }

    @Delete(':id')
    remove(@Param('id') id:string) {
        return this.coffeeService.remove(id);
    }
}
