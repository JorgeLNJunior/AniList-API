import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '@shared/services/bcrypt.service';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private bcrypt: BcryptService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await this.bcrypt.hash(createUserDto.password);
    createUserDto.password = passwordHash;

    const user = this.userRepository.create(createUserDto);

    return this.userRepository.save(user);
  }

  async find() {
    return this.userRepository.find();
  }
}
