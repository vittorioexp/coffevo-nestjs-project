import { Injectable } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: 'name',
            brand: 'brand',
            flavors: ['f1','f2']
        }
    ];

    findAll() {
        return this.coffees;
    }

    findOne(id: string) {
        return this.coffees.find(item => item.id === +id);
    }

    create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto;
    }

    update(id: string, updateCoffeeDto: any) {
        const currentCoffee = this.findOne(id);
        if (currentCoffee) {
            // update coffee
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
            this.coffees.splice(coffeeIndex, 1);
        }
    }

}
