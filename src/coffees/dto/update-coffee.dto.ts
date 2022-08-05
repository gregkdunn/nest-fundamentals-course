/*
import { IsString } from 'class-validator';

export class UpdateCoffeeDto {
  @IsString()
  readonly name?: string;

  @IsString()
  readonly brand?: string;

  @IsString()
  readonly origin?: string;

  @IsString({ each: true })
  readonly flavors?: string[];
}
*/

import { PartialType } from '@nestjs/mapped-types';
import { CreateCoffeeDto } from './create-coffee.dto';

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
