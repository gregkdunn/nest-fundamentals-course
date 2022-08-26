import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Coffee } from './coffee.entity';
//import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Flavor } from './flavor.entity';

export class MockCoffeesService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [
    {
      provide: CoffeesService, // 👈 Token Name
      useValue: new MockCoffeesService(), // 👈 Class
    },
    {
      provide: 'COFFEE_BRANDS',
      useValue: ['Cool Beans', "Jittery Joe's", 'Rev'], // 👈 Non Class Provider
    },
    /* * /
    {
      provide: COFFEE_BRANDS,// 👈 Constant Token Name
      useValue: ['Cool Beans', "Jittery Joe's", 'Rev'],
    },
    // */
  ],
  exports: [TypeOrmModule, CoffeesService],
})
export class CoffeesModule {}
