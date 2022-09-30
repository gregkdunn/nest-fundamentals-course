import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { IndentityPipe } from 'src/common/pipes/indentity.pipe';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// Bind Pipe at Controller - Better to use Class instead of new Instance
// @UsePipes(ValidationPipe)
@ApiTags('Coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly requests: Request,
  ) {
    console.log('!!! CoffeesController Instantiated !!!');
  }

  // Bind Pipe at Method
  // @UsePipes(ValidationPipe)

  // Standard MetaData
  //@SetMetadata('isPublic', true)
  // Custom Decorator

  @ApiResponse({ status: 403, description: 'Forbidden.' })
  // @ApiForbiddenResponse({description: 'Forbidden.'})
  @Public()
  @Get()
  async findAll(
    @Protocol('ws') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('findAll.protocol', protocol);

    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return this.coffeesService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', IndentityPipe, ParseIntPipe) id: number) {
    console.log('findOne.id', id);
    return this.coffeesService.findOne(id);
  }

  @Post()
  create(@Body() createCoffeeDTO: CreateCoffeeDto) {
    console.log(
      'createCoffeeDTO instance',
      createCoffeeDTO,
      createCoffeeDTO instanceof CreateCoffeeDto,
    );
    return this.coffeesService.create(createCoffeeDTO);
  }

  @Patch(':id')
  // Param binding
  // update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
