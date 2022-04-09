import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Vote } from '../entities/vote.entity'


@Injectable()
export class VoteModifyPermissionGuard implements CanActivate {
  constructor (
    @InjectRepository(Vote) private voteRepository: Repository<Vote>
  ) {}

  async canActivate (context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const isAdmin = request.user.isAdmin
    if (isAdmin) return true

    const voteUuid = request.params.uuid
    const userUuid = request.user.uuid

    const vote = await this.voteRepository.findOne(voteUuid, {
      relations: ['user']
    })
    if (!vote) throw new BadRequestException(['vote not found'])

    const isVoteAuthor = vote.user.uuid === userUuid
    if (!isVoteAuthor) return false
    return true
  }
}
