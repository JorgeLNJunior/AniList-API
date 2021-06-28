import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateAnimeDto } from './dto/create-anime.dto';
import { UpdateAnimeDto } from './dto/update-anime.dto';
import { Anime } from './entities/anime.entity';
import { AnimeQueryBuilder } from './query/anime.query.builder';
import { AnimeQuery } from './query/anime.query.interface';

@Injectable()
export class AnimeService {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
  ) {}
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

  update(id: number, updateAnimeDto: UpdateAnimeDto) {
    return `This action updates a #${id} anime`;
  }

  remove(id: number) {
    return `This action removes a #${id} anime`;
  }
}
