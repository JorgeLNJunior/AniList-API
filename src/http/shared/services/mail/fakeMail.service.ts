import { User } from '@http/modules/user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { IMailService } from './interface/mail.service.interface';

@Injectable()
export class FakeMailService implements IMailService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async sendConfirmationEmail(user: User): Promise<void> {
    await this.userRepository.update(user.uuid, { isEmailConfirmed: true });
  }
}
