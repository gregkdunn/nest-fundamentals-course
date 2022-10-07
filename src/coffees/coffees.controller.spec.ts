import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

describe('CoffeesController', () => {
  let controller: CoffeesController;
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: CoffeesService,
          useValue: {
            findAll: jest.fn(),
          },
        },
      ],
      controllers: [CoffeesController],
    }).compile();

    controller = module.get<CoffeesController>(CoffeesController);
    service = module.get<CoffeesService>(CoffeesService);
  });

  it('should be defined', () => {
    service.findAll.mockReturnValue({ this: true });

    expect(controller).toBeDefined();
  });
});
