import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';

@Injectable()
export class CoffeesService {
  private coffees: Coffee[] = [
    {
      id: 1,
      name: 'Shipwreck Roast',
      brand: 'Buddy Brew',
      origin: 'Bermuda',
      flavors: ['chocolate', 'vanilla'],
    },
  ];

  findAll() {
    return this.coffees;
  }

  findOne(id: string) {
    // throw 'a random error';
    const coffee: Coffee = this.coffees.find((coffee) => coffee.id === +id);
    if (!coffee) {
      // throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
      throw new NotFoundException(`Coffee #${id} not found`);
    }
    return coffee;
  }

  create(newCoffee: Coffee) {
    const newId = this.newCoffeeId();
    this.coffees = [
      ...this.coffees,
      { ...newCoffee, id: newId } /** Need to add the id */
    ];
    return this.findOne(`${newId}`);
  }

  update(id: string, updateCoffeeDto: Partial<Coffee>) {
    this.coffees = this.coffees.map((coffee) => {
      return coffee.id === +id ? { ...coffee, updateCoffeeDto } : coffee;
    });
    return this.findOne(id);
  }

  remove(id: string) {
    this.coffees = this.coffees.filter((coffee: Coffee) => coffee.id !== +id);
    return this.findAll();
  }

  newCoffeeId(): number {
    return this.coffees.length + 1;
  }
}
