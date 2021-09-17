import { BcryptService } from '@http/shared/services/bcrypt.service';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserQueryBuilder } from './query/user.query.builder';
import { UserQuery } from './query/user.query.interface';

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectQueue('avatar-compression') private avatarQueue: Queue,
    private bcrypt: BcryptService,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    const isAdminUserCreated = await this.userRepository.find({
      name: 'admin',
    });
    if (isAdminUserCreated[0]) return;
    const email = this.configService.get<string>('ADMIN_EMAIL');
    const password = this.configService.get<string>('ADMIN_PASSWORD');
    const hash = await this.bcrypt.hash(password);
    const admin = this.userRepository.create({
      name: 'admin',
      email: email,
      password: hash,
      isAdmin: true,
      isEmailConfirmed: true,
    });
    await this.userRepository.save(admin);
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

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(uuid);
    if (!user) throw new BadRequestException(['user not found']);

    await this.userRepository.update(uuid, updateUserDto);
    return await this.userRepository.findOne(uuid);
  }

  async delete(uuid: string) {
    await this.userRepository.delete(uuid);
  }

  async upload(uuid: string, path: string) {
    await this.avatarQueue.add({ userUuid: uuid, path: path });
    return 'the image will be available soon';
  }
}
