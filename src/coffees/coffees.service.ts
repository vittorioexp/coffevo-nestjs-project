import { BadRequestException, Inject, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from '../events/entities/event.entity/event.entity';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { UsersService } from 'src/users/users.service';
import { ForbiddenError } from '@casl/ability';
import { Rate } from './entities/rate.entity';
import { RateCoffeeDto } from './dto/rate-coffee.dto';

@Injectable()
export class CoffeesService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    @InjectRepository(Rate)
    private readonly rateRepository: Repository<Rate>,
    private readonly usersService: UsersService,
    private readonly dataSource: DataSource,
    private readonly configService: ConfigService,
    @Inject(coffeesConfig.KEY)
    private coffeesConfiguration: ConfigType<typeof coffeesConfig>, 
  ) {
    console.log(coffeesConfiguration.foo);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const {limit, offset} = paginationQuery;
    return this.coffeeRepository.find({
      relations: {
        flavors: true,
        inventor: true,
        rates: true,
      },
      select: {
        inventor: {
          id: true,
          username: true,
          role: true,
        },
      },
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id,
      },
      relations: {
        flavors: true,
        inventor: true,
        rates: true,
      },
      select: {
        inventor: {
          id: true,
          username: true,
          role: true,
        },
      },
    });

    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto, inventor: any) {

    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    );

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
      inventor: inventor,
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ));

    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors,
    });
    if (!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }

  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  async reccomendCoffee(coffee: Coffee) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      //coffee.reccomendations++;

      const reccomendEvent = new Event();
      reccomendEvent.name = 'reccomend_coffee';
      reccomendEvent.type = 'coffee';
      reccomendEvent.payload = { coffeeId: coffee.id };

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }  

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({ name });
  }

  async rateCoffee(coffeeId: string, username: string, rateCoffeeDto: RateCoffeeDto) {

    // Check if the coffee exists, otherwise throw the usual exception
    await this.findOne(coffeeId)

    const rates = await this.rateRepository.find({ 
      where: { 
        coffee: { 
          id: +coffeeId
        }
      }, 
      relations: {
        author: true,
      },
      select: {
        author: {
          username: true
        }
      },
    });

    const userAlreadyRated = rates.find((rate) => rate?.author.username == username);

    // if the user hasn't already rated the coffee, add the new rate, else throw an exception
    if (!userAlreadyRated) {      
      const user = await this.usersService.findOne(username)

      await this.rateRepository.save({
        author: { id: +user.id },
        coffee: { id: +coffeeId },
        rate: rateCoffeeDto.rate,
        description: rateCoffeeDto?.description
      });

      return await this.findOne(coffeeId);
    } else {
      throw new BadRequestException("User already rated this coffee");
    }
  }
}
