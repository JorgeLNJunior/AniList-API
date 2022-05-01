import { CanActivate, ExecutionContext } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserAnimeList } from '../entities/userAnimeList.entity'

export class UserAnimeListModifyPermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserAnimeList) private userAnimeListRepository: Repository<UserAnimeList>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const isAdmin = request.user.isAdmin
    if (isAdmin) return true

    const tokenUUID = request.user.uuid
    const listUUID = request.params.uuid
    const list = await this.userAnimeListRepository.findOne(listUUID, {
      relations: ['user']
    })

    const isListOwner = list.user.uuid === tokenUUID

    if (!isListOwner) return false
    return true
  }
}
