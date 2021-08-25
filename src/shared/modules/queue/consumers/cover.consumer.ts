import { Anime } from '@modules/anime/entities/anime.entity';
import { AnimeStorage } from '@modules/anime/storage/anime.storage';
import { IAnimeStorage } from '@modules/anime/storage/anime.storage.interface';
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';

@Processor('cover-compression')
export class CoverCompressConsumer {
  constructor(
    @InjectRepository(Anime) private animeRepository: Repository<Anime>,
  ) {
    this.animeStorage = AnimeStorage.getInstance();
  }

  private animeStorage: IAnimeStorage;

  @Process()
  async compress(job: Job<CoverCompressJob>) {
    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const url = await this.storeCover(buffer);

    await this.updateCover(job.data.animeUuid, url);
  }

  private async storeCover(buffer: Buffer) {
    return this.animeStorage.uploadCover(buffer);
  }

  private async updateCover(uuid: string, url: string) {
    await this.animeRepository.update(uuid, { cover: url });
  }
}

interface CoverCompressJob {
  animeUuid: string;
  path: string;
}
