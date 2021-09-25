import { Review } from '@http/modules/review/entities/review.entity'
import { User } from '@http/modules/user/entities/user.entity'
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Vote {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Review)
  review: Review

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date
}
