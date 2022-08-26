import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Coffee } from './coffee.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Flavor } from './flavor.entity';

class ConfigService {}
class DevelopmentConfigService {}
class ProductionConfigService {}

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['Cool Beans', "Jittery Joe's", 'Rev'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [
    {
      provide: ConfigService,
      useClass:
        process.env.NODE_ENV === 'development'
          ? DevelopmentConfigService
          : ProductionConfigService,
    },
    CoffeesService,
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS, // 👈 Constant Token Name
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [TypeOrmModule, CoffeesService],
})
export class CoffeesModule {}
