import { User } from '@http/modules/user/entities/user.entity'
import { UserStorage } from '@http/modules/user/storage/user.storage'
import { OnQueueError, Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Job } from 'bull'
import { rm } from 'fs/promises'
import * as sharp from 'sharp'
import { Repository } from 'typeorm'

import { Jobs } from './types/jobs.enum'
import { AvatarCompressJob } from './types/jobs.interface'

@Processor(Jobs.AVATAR_COMPRESSION)
export class AvatarCompressionConsumer {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private userStorage: UserStorage
  ) { }

  private readonly logger = new Logger(AvatarCompressionConsumer.name);

  @Process()
  async compress(job: Job<AvatarCompressJob>) {
    const oldAvatar = (await this.userRepository.findOne(job.data.userUuid)).avatar

    const buffer = await sharp(job.data.path)
      .jpeg({ mozjpeg: true })
      .toBuffer()

    const url = await this.storeAvatar(buffer)

    await this.updateAvatar(job.data.userUuid, url)

    await this.deleteOldAvatar(oldAvatar)

    await this.deleteTempFile(job.data.path)
  }

  @OnQueueError()
  onError(error: Error) {
    this.logger.error('Error when process a queue', error.message)
  }

  private async storeAvatar(buffer: Buffer) {
    return this.userStorage.uploadAvatar(buffer)
  }

  private async updateAvatar(uuid: string, url: string) {
    await this.userRepository.update(uuid, { avatar: url })
  }

  private async deleteOldAvatar(avatarUrl: string) {
    if (avatarUrl) {
      await this.userStorage.deleteOldAvatar(avatarUrl)
    }
  }

  private async deleteTempFile(path: string) {
    await rm(path, { force: true })
  }
}
