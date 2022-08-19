import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './coffee.entity';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Flavor } from './flavor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])], // 👈 Adding Coffee Entity here to TypeOrmModule.forFeature
  controllers: [CoffeesController],
  providers: [CoffeesService],
  exports: [TypeOrmModule, CoffeesService]
})
export class CoffeesModule {}
