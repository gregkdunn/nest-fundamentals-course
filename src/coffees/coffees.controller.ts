import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns the next ${limit} coffees offset at ${offset}`;;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns coffee - ${id}`;
  }

  @Post()
  /** @HttpCode(HttpStatus.GONE)/** static status code */
  create(@Body() body) {
    /** 'name' to only return that value form the body JSON */
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body('name') body) {
    return `This action updates coffee - ${id} : ${body}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes coffee - ${id}`;
  }
}
