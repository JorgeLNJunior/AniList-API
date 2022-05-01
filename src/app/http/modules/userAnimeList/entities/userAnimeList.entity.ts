import { Anime } from "@http/modules/anime/entities/anime.entity";
import { User } from "@http/modules/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

import { AnimeStatus } from "../types/animeStatus.enum";

@Entity()
export class UserAnimeList {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({
    type: 'enum',
    enum: AnimeStatus,
  })
  status: AnimeStatus;

  @ManyToOne(() => User, { cascade: ['update', 'remove'] })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Anime, { cascade: ['update', 'remove'] })
  @JoinColumn()
  anime: Anime;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
