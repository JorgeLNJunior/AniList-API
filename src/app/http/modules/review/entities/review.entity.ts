import { Anime } from '@http/modules/anime/entities/anime.entity'
import { User } from '@http/modules/user/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Review {
  @PrimaryGeneratedColumn('uuid')
  uuid: string

  @Column()
  title: string

  @Column({ length: 1000 })
  description: string

  @Column()
  rating: number

  @ManyToOne(() => Anime, { cascade: ['update', 'remove'] })
  @JoinColumn()
  anime: Anime

  @ManyToOne(() => User, { cascade: ['update', 'remove'] })
  @JoinColumn()
  user: User

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
