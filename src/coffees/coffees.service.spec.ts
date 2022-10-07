import { ConfigService, getConfigToken } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Coffee } from './coffee.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';
import { Flavor } from './flavor.entity';
import {
  createMockRepository,
  MockRepository,
} from '../common/mocks/mock.repository';
import { NotFoundException } from '@nestjs/common';

class ProductionConfigService {}

describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        {
          provide: getRepositoryToken(Flavor),
          useValue: createMockRepository(),
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: createMockRepository(),
        },
        { provide: DataSource, useValue: {} },
        { provide: COFFEE_BRANDS, useValue: [] },
        { provide: getConfigToken('coffees'), useValue: {} },
        {
          provide: ConfigService,
          useClass: ProductionConfigService,
        },
        CoffeesService,
      ],
    }).compile();

    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    describe('when coffee with ID exists', () => {
      it('should return the coffee object', async () => {
        // setup
        const coffeeId = 1;
        const expectedCoffee = {};
        coffeeRepository.findOne.mockReturnValue(expectedCoffee);
       
        // execution
        const coffee = await service.findOne(coffeeId);
       
        // test
        expect(coffee).toEqual(expectedCoffee);
      });
    });
    describe('otherwise', () => {
      it('should throw the "NotFoundException"', async () => {
        const coffeeId = 1;

        coffeeRepository.findOne.mockReturnValue(undefined);

        try {
          await service.findOne(coffeeId);
          //expect(false).toBeTruthy(); // we should never hit this line
        } catch (err) {
          expect(err).toBeInstanceOf(NotFoundException);
          expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
        }
      });
    });
  });
});
