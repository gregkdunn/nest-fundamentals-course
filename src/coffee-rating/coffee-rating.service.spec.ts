import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingService } from './coffee-rating.service';

describe('CoffeeRatingService', () => {
  let service: CoffeeRatingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoffeesModule],
      providers: [CoffeeRatingService],
    }).compile();

    service = module.get<CoffeeRatingService>(CoffeeRatingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
