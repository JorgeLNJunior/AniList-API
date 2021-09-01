import { Anime } from '@http/modules/anime/entities/anime.entity';
import { AnimeStorage } from '@http/modules/anime/storage/anime.storage';
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
    private animeStorage: AnimeStorage,
  ) {}

  private readonly logger = new Logger(CoverCompressConsumer.name);

  @Process()
  async compress(job: Job<CoverCompressJob>) {
    // eslint-disable-next-line prettier/prettier
    const oldCover = (await this.animeRepository.findOne(job.data.animeUuid)).cover;

    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const url = await this.storeCover(buffer);

    await this.updateCover(job.data.animeUuid, url);

    await this.deleteOldCover(oldCover);

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

  private async deleteOldCover(coverUrl: string) {
    if (coverUrl) {
      await this.animeStorage.deleteOldCover(coverUrl);
    }
  }

  private deleteTempFile(path: string) {
    rmSync(path, { force: true });
  }
}

interface CoverCompressJob {
  animeUuid: string;
  path: string;
}
