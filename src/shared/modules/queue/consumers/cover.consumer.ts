import { Anime } from '@modules/anime/entities/anime.entity';
import { AnimeStorage } from '@modules/anime/storage/anime.storage';
import { IAnimeStorage } from '@modules/anime/storage/anime.storage.interface';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { rmSync } from 'fs';
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
  private readonly logger = new Logger(CoverCompressConsumer.name);

  @Process()
  async compress(job: Job<CoverCompressJob>) {
    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const url = await this.storeCover(buffer);

    await this.updateCover(job.data.animeUuid, url);

    this.deleteTempFile(job.data.path);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message);
  }

  private async storeCover(buffer: Buffer) {
    return this.animeStorage.uploadCover(buffer);
  }

  private async updateCover(uuid: string, url: string) {
    await this.animeRepository.update(uuid, { cover: url });
  }

  private deleteTempFile(path: string) {
    rmSync(path, { force: true });
  }
}

interface CoverCompressJob {
  animeUuid: string;
  path: string;
}
