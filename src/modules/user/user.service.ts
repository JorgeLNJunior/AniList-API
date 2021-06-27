import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '@shared/services/bcrypt.service';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQueryBuilder } from './query/user.query.builder';
import { UserQuery } from './query/user.query.interface';
import { UserStorage } from './storage/user.storage';
import { IUserStorage } from './storage/user.storage.interface';

@Injectable()
export class UserService {
  private storage: IUserStorage;
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private bcrypt: BcryptService,
  ) {
    this.storage = UserStorage.getInstance();
  }

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

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    await this.userRepository.update(uuid, updateUserDto);
    return await this.userRepository.findOne(uuid);
  }

  async delete(uuid: string) {
    await this.userRepository.delete(uuid);
  }

  async upload(uuid: string, file: Express.Multer.File) {
    const url = await this.storage.uploadAvatar(file);
    await this.userRepository.update(uuid, { avatar: url });
    return this.userRepository.findOne(uuid);
  }
}
