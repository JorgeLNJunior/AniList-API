import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
import { AnimeQueryBuilder } from './query/anime.query.builder';
import { AnimeQuery } from './query/anime.query.interface';
import { AnimeStorage } from './storage/anime.storage';
import { IAnimeStorage } from './storage/anime.storage.interface';

@Injectable()
export class AnimeService {
  private storage: IAnimeStorage;

  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
  ) {
    this.storage = AnimeStorage.getInstance();
  }
  create(createAnimeDto: CreateAnimeDto) {
    const anime = this.animeRepository.create(createAnimeDto);
    return this.animeRepository.save(anime);
  }

  find(query: AnimeQuery) {
    const findOptions = new AnimeQueryBuilder(query).build();
    return this.animeRepository.find(findOptions);
  }

  findOne(id: number) {
    return `This action returns a #${id} anime`;
  }

  async update(uuid: string, updateAnimeDto: UpdateAnimeDto) {
    const anime = await this.animeRepository.findOne(uuid);
    if (!anime) throw new BadRequestException(['anime not found']);

    await this.animeRepository.update(uuid, updateAnimeDto);
    return this.animeRepository.findOne(uuid);
  }

  async delete(uuid: string) {
    await this.animeRepository.delete(uuid);
  }

  async upload(uuid: string, file: Express.Multer.File) {
    const url = await this.storage.uploadCover(file);

    await this.animeRepository.update(uuid, { cover: url });
    return this.animeRepository.findOne(uuid);
  }
}
