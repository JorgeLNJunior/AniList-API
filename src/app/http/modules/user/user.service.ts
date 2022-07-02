import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { Jobs } from '@modules/queue/types/jobs.enum'
import { InjectQueue } from '@nestjs/bull'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnApplicationBootstrap
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Queue } from 'bull'
import { Repository } from 'typeorm'

import { Review } from '../review/entities/review.entity'
import { UserAnimeList } from '../userAnimeList/entities/userAnimeList.entity'
import { Vote } from '../vote/entities/vote.entity'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { ReviewsByUserQueryBuilder } from './query/review/reviewsByUser.query.builder'
import { ReviewsByUserQuery } from './query/review/reviewsByUser.query.interface'
import { UserQueryBuilder } from './query/user.query.builder'
import { UserQuery } from './query/user.query.interface'
import { UserAnimeListByUserQueryBuilder } from './query/userAnimeListByUser.query.builder'
import { UserAnimeListByUserQuery } from './query/userAnimeListByUser.query.interface'
import { VotesByUserQueryBuilder } from './query/votes/votesByUser.query.builder'
import { VotesByUserQuery } from './query/votes/votesByUser.query.interface'

@Injectable()
export class UserService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAnimeList)
    private userAnimeListRepository: Repository<UserAnimeList>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectQueue(Jobs.AVATAR_COMPRESSION) private avatarQueue: Queue,
    private bcrypt: BcryptService,
    private configService: ConfigService
  ) {}

  async onApplicationBootstrap() {
    const isAdminUserAlreadyCreated = await this.userRepository.findOne({
      where: { name: 'admin' }
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

  async find(query?: UserQuery): Promise<PaginationInterface<User>> {
    const findOptions = new UserQueryBuilder(query).build()

    const total = await this.userRepository.count({ where: findOptions.where })
    const users = await this.userRepository.find(findOptions)

    return { data: users, pageTotal: users.length, total: total }
  }

  async findOne(uuid: string) {
    const user = await this.userRepository.findOne({ where: { uuid: uuid } })
    if (!user) throw new NotFoundException(`Resource /users/${uuid} not found`)
    return user
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { uuid: uuid } })
    if (!user) throw new BadRequestException(['user not found'])

    await this.userRepository.update(uuid, updateUserDto)
    return await this.userRepository.findOne({ where: { uuid: uuid } })
  }

  async delete(uuid: string) {
    await this.userRepository.softDelete(uuid)
  }

  async upload(uuid: string, path: string) {
    await this.avatarQueue.add({ userUUID: uuid, path: path })
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
      ...findOptions
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
      data: results,
      pageTotal: results.length,
      total: total
    }
  }

  async getUserReviews(
    userUUID: string,
    query: ReviewsByUserQuery
  ): Promise<PaginationInterface<Review>> {
    const findOptions = new ReviewsByUserQueryBuilder(query).build()

    const total = await this.reviewRepository.count({
      where: { user: { uuid: userUUID } },
      ...findOptions
    })
    const reviews = await this.reviewRepository.find({
      where: { user: { uuid: userUUID } },
      ...findOptions,
      loadRelationIds: {
        relations: ['anime'],
        disableMixedMap: true
      }
    })

    return {
      data: reviews,
      pageTotal: reviews.length,
      total: total
    }
  }

  async getUserVotes(
    userUUID: string,
    query: VotesByUserQuery
  ): Promise<PaginationInterface<Vote>> {
    const findOptions = new VotesByUserQueryBuilder(query).build()

    const total = await this.voteRepository.count({
      where: { user: { uuid: userUUID } },
      ...findOptions
    })
    const votes = await this.voteRepository.find({
      where: { user: { uuid: userUUID } },
      ...findOptions,
      loadRelationIds: {
        relations: ['review'],
        disableMixedMap: true
      }
    })

    return {
      data: votes,
      pageTotal: votes.length,
      total: total
    }
  }
}
