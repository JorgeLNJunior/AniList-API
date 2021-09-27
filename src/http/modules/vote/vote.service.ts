import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Review } from '../review/entities/review.entity'
import { User } from '../user/entities/user.entity'
import { CreateVoteDto } from './dto/create-vote.dto'
import { UpdateVoteDto } from './dto/update-vote.dto'
import { Vote } from './entities/vote.entity'

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

  findAll () {
    return 'This action returns all vote'
  }

  findOne (id: number) {
    return `This action returns a #${id} vote`
  }

  update (id: number, updateVoteDto: UpdateVoteDto) {
    return `This action updates a #${id} vote`
  }

  remove (id: number) {
    return `This action removes a #${id} vote`
  }
}
