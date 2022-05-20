import { User } from '@http/modules/user/entities/user.entity';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IMailService } from './types/mail.service.interface';

@Injectable()
export class FakeMailService implements IMailService {
  private logger = new Logger(FakeMailService.name);

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async sendUserActivationEmail(user: User): Promise<void> {
    try {
      await this.userRepository.update(user.uuid, { isActive: true });
    } catch (error) {
      this.logger.error('failed to send email', error);
    }
  }
}
