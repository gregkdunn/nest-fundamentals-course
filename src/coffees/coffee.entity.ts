/* Coffee Schema - FINAL CODE */
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { Schema, Prop } from '@nestjs/mongoose’';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document {
  // Mongoose adds _id to the Schema by default

  @Prop()
  name: string;

  @Prop()
  brand: string;

  @Prop()
  origin: string;

  @Prop([String])
  flavors: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);

/* Add Schema to MongooseModule in CoffeesModule */
MongooseModule.forFeature([
  {
    name: Coffee.name,
    schema: CoffeeSchema,
  },
]);
