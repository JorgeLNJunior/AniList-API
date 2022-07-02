import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Review } from '../review/entities/review.entity'
import { User } from '../user/entities/user.entity'
import { CreateVoteDto } from './dto/create-vote.dto'
import { Vote } from './entities/vote.entity'
import { VoteQueryBuilder } from './query/vote.query.builder'
import { VoteQuery } from './query/vote.query.interface'

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  async create(userUUID: string, createVoteDto: CreateVoteDto): Promise<Vote> {
    const review = await this.reviewRepository.findOne({
      where: { uuid: createVoteDto.reviewUUID }
    })
    if (!review) throw new BadRequestException(['review not found'])

    const user = await this.userRepository.findOne({
      where: { uuid: userUUID }
    })
    if (!user) throw new BadRequestException(['user not found'])

    const isAlreadyVoted = await this.voteRepository.findOne({
      where: {
        user: { uuid: userUUID },
        review: { uuid: createVoteDto.reviewUUID }
      },
      relations: ['user', 'review']
    })
    if (isAlreadyVoted)
      throw new BadRequestException(['you have already voted'])

    return this.voteRepository.save({
      user: user,
      review: review
    })
  }

  async find(query: VoteQuery): Promise<PaginationInterface<Vote>> {
    const findOptions = new VoteQueryBuilder(query).build()

    const total = await this.voteRepository.count(findOptions)
    const votes = await this.voteRepository.find({
      ...findOptions,
      loadRelationIds: {
        relations: ['user', 'review'],
        disableMixedMap: true
      }
    })

    return { data: votes, pageTotal: votes.length, total: total }
  }

  async findOne(uuid: string) {
    const vote = await this.voteRepository.findOne({
      where: { uuid: uuid },
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['user', 'review']
      }
    })
    if (!vote) throw new NotFoundException(`Reource /votes/${uuid} not found`)
    return vote
  }

  async delete(uuid: string) {
    await this.voteRepository.softDelete(uuid)
  }
}
