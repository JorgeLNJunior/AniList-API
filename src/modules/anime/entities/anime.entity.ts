import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Anime {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  title: string;

  @Column({ length: '1000' })
  synopsis: string;

  @Column({ nullable: true })
  cover: string;

  @Column()
  trailer: string;

  @Column()
  episodes: number;

  @Column()
  releaseDate: string;
}
