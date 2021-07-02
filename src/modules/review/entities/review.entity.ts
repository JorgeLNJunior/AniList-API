import { Anime } from '@modules/anime/entities/anime.entity';
import { User } from '@modules/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column({ length: 1000 })
  description: string;

  @Column()
  rating: number;

  @ManyToOne(() => Anime)
  @JoinColumn()
  anime: Anime;

  @ManyToOne(() => User)
  @JoinColumn()
  user: User;
}
