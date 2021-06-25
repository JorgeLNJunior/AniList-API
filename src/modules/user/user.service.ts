import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '@shared/services/bcrypt.service';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserQueryBuilder } from './query/user.query.builder';
import { UserQuery } from './query/user.query.interface';

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

  async find(query?: UserQuery) {
    const findOptions = new UserQueryBuilder(query).build();
    return this.userRepository.find(findOptions);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.find({
      where: { email: email },
    });
    return user[0];
  }
}
