import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeeService: CoffeesService) {}

    @Get('flavors')
    findAll(@Query() paginationQuery) {
        // const {limit, offset} = paginationQuery;
        return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        const coffee = this.coffeeService.findOne(id);
        if (!coffee) {
            throw new NotFoundException('Coffee ' + id + ' not found');
        }
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
