import { Coffee } from 'src/coffees/coffee.entity';
import { Flavor } from 'src/coffees/flavor.entity';
import { CoffeeRefactor1660918928430 } from 'src/migrations/1660918928430-CoffeeRefactor';
import { SchemaSync1660920759647 } from 'src/migrations/1660920759647-SchemaSync';
import { DataSource } from 'typeorm';

/* typeorm-cli.config.ts */
export default new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5439,
  username: 'postgres',
  password: 'pass123',
  database: 'postgres',
  entities: [Coffee, Flavor],
  migrations: [CoffeeRefactor1660918928430, SchemaSync1660920759647],
});
