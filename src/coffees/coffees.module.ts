import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { ConfigModule } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { UsersModule } from 'src/users/users.module';


@Module({
    imports: [
        TypeOrmModule.forFeature([Coffee, Flavor, Event]), 
        ConfigModule.forFeature(coffeesConfig),
        UsersModule,
    ],
    controllers: [CoffeesController],
    providers: [CoffeesService],
    exports: [CoffeesService]
})
export class CoffeesModule {}
