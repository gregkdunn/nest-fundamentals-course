import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // sql table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({ nullable: true })
  desecription: string;

  @Column()
  origin: string;

  @Column({ default: 0 })
  recommendations: number;

  /*
  @Column('json', { nullable: true })
  flavors: string[];
  */

  @JoinTable()
  @ManyToMany(
    (type) => Flavor,
    (flavor) => flavor.coffees, // How do you retrieve THIS CLASS within the THE OTHER Entity
    {
      cascade: ['insert', 'update'],
    },
  )
  flavors: Flavor[];
}
