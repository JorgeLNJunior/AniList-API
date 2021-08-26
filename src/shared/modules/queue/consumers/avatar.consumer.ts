import { User } from '@modules/user/entities/user.entity';
import { UserStorage } from '@modules/user/storage/user.storage';
import { IUserStorage } from '@modules/user/storage/user.storage.interface';
import { OnQueueError, Process, Processor } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
import { rmSync } from 'fs';
import * as sharp from 'sharp';
import { Repository } from 'typeorm';

@Processor('avatar-compression')
export class AvatarCompressConsumer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.userStorage = UserStorage.getInstance();
  }

  private userStorage: IUserStorage;
  private readonly logger = new Logger(AvatarCompressConsumer.name);

  @Process()
  async compress(job: Job<AvatarCompressJob>) {
    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const url = await this.storeCover(buffer);

    await this.updateAvatar(job.data.userUuid, url);

    this.deleteTempFile(job.data.path);
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message);
  }

  private async storeCover(buffer: Buffer) {
    return this.userStorage.uploadAvatar(buffer);
  }

  private async updateAvatar(uuid: string, url: string) {
    await this.userRepository.update(uuid, { avatar: url });
  }

  private deleteTempFile(path: string) {
    rmSync(path, { force: true });
  }
}

interface AvatarCompressJob {
  userUuid: string;
  path: string;
}
