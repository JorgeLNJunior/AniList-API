import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Repository } from 'typeorm'

import { UserAnimeList } from '../userAnimeList/entities/userAnimeList.entity'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UserQueryBuilder } from './query/user.query.builder'
import { UserQuery } from './query/user.query.interface'
import { UserAnimeListByUserQueryBuilder } from './query/userAnimeListByUser.query.builder'
import { UserAnimeListByUserQuery } from './query/userAnimeListByUser.query.interface'

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAnimeList) private userAnimeListRepository: Repository<UserAnimeList>,
    @InjectQueue(Jobs.AVATAR_COMPRESSION) private avatarQueue: Queue,
    private bcrypt: BcryptService,
    private configService: ConfigService
  ) { }

  async onApplicationBootstrap() {
    const isAdminUserAlreadyCreated = await this.userRepository.findOne({
      name: 'admin'
    })
    if (isAdminUserAlreadyCreated) return

    const email = this.configService.get<string>('ADMIN_EMAIL')
    const password = this.configService.get<string>('ADMIN_PASSWORD')
    const hash = await this.bcrypt.hash(password)

    const admin = this.userRepository.create({
      name: 'admin',
      email: email,
      password: hash,
      isAdmin: true,
      isActive: true
    })

    await this.userRepository.save(admin)
  }

  async create(createUserDto: CreateUserDto) {
    const passwordHash = await this.bcrypt.hash(createUserDto.password)
    createUserDto.password = passwordHash

    const user = this.userRepository.create(createUserDto)

    return this.userRepository.save(user)
  }

  async find(query?: UserQuery): Promise<PaginationInterface<User>> {
    const findOptions = new UserQueryBuilder(query).build()

    const total = await this.userRepository.count({ where: findOptions.where })
    const users = await this.userRepository.find(findOptions)

    return { results: users, pageTotal: users.length, total: total }
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(uuid)
    if (!user) throw new BadRequestException(['user not found'])

    await this.userRepository.update(uuid, updateUserDto)
    return await this.userRepository.findOne(uuid)
  }

  async delete(uuid: string) {
    await this.userRepository.softDelete(uuid)
  }

  async upload(uuid: string, path: string) {
    await this.avatarQueue.add({ userUuid: uuid, path: path })
    return 'the image will be available soon'
  }

  async getUserAnimeList(
    userUUID: string,
    query: UserAnimeListByUserQuery
  ): Promise<PaginationInterface<UserAnimeList>> {
    const findOptions = new UserAnimeListByUserQueryBuilder(query).build()

    const total = await this.userAnimeListRepository.count({
      where: {
        user: { uuid: userUUID }
      },
      ...findOptions,
    })
    const results = await this.userAnimeListRepository.find({
      where: {
        user: { uuid: userUUID }
      },
      ...findOptions,
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime']
      }
    })

    return {
      results: results,
      pageTotal: results.length,
      total: total
    }
  }
}
