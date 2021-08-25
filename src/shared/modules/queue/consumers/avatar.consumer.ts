import { User } from '@modules/user/entities/user.entity';
import { UserStorage } from '@modules/user/storage/user.storage';
import { IUserStorage } from '@modules/user/storage/user.storage.interface';
import { Process, Processor } from '@nestjs/bull';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bull';
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

  @Process()
  async compress(job: Job<AvatarCompressJob>) {
    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer();

    const url = await this.storeCover(buffer);

    await this.updateAvatar(job.data.userUuid, url);
  }

  private async storeCover(buffer: Buffer) {
    return this.userStorage.uploadAvatar(buffer);
  }

  private async updateAvatar(uuid: string, url: string) {
    await this.userRepository.update(uuid, { avatar: url });
  }
}

interface AvatarCompressJob {
  userUuid: string;
  path: string;
}
