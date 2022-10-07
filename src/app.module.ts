import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/nest-course')],
  controllers: [AppController, CoffeesController],
  providers: [AppService, CoffeesService],
})
export class AppModule {}
