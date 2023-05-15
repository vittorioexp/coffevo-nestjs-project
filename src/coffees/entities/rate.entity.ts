import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Coffee } from './coffee.entity';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', nullable: false })
  rate: number;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(
    type => User,
    user => user.rates,
  )
  author: User;

  @ManyToOne(
    type => Coffee,
    coffee => coffee.rates
  )
  coffee: Coffee;
  
}
