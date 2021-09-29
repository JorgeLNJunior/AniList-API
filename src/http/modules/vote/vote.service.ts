import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { BadRequestException, Injectable } from '@nestjs/common'
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
  constructor (
    @InjectRepository(Vote) private voteRepository: Repository<Vote>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>
  ) {}

  async create (userUuid: string, createVoteDto: CreateVoteDto): Promise<Vote> {
    const review = await this.reviewRepository.findOne(createVoteDto.reviewUuid)
    if (!review) throw new BadRequestException(['review not found'])

    const user = await this.userRepository.findOne(userUuid)
    if (!user) throw new BadRequestException(['user not found'])

    const isAlreadyVoted = await this.voteRepository.findOne({
      user: { uuid: userUuid },
      review: { uuid: createVoteDto.reviewUuid }
    },
    { relations: ['user', 'review'] })
    if (isAlreadyVoted) throw new BadRequestException(['you have already voted'])

    return this.voteRepository.save({
      user: user,
      review: review
    })
  }

  async find (query: VoteQuery): Promise<PaginationInterface<Vote>> {
    const findOptions = new VoteQueryBuilder(query).build()

    const total = await this.voteRepository.count(findOptions)
    const votes = await this.voteRepository.find({
      ...findOptions,
      relations: ['user', 'review']
    })

    return { results: votes, pageTotal: votes.length, total: total }
  }

  async delete (uuid: string) {
    await this.voteRepository.softDelete(uuid)
  }
}
