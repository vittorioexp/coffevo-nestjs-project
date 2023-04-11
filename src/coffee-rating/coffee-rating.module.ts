import { Module } from '@nestjs/common';
import { CoffeesModule } from '../coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService]
})
export class CoffeeRatingModule {}
