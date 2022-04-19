import { CanActivate, ExecutionContext } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserList } from '../entities/userList.entity'

export class UserListModifyPermissionGuard implements CanActivate {
  constructor(
    @InjectRepository(UserList) private userListRepository: Repository<UserList>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const isAdmin = request.user.isAdmin
    if (isAdmin) return true

    const tokenUUID = request.user.uuid
    const listUUID = request.params.uuid
    const list = await this.userListRepository.findOne(listUUID, {
      relations: ['user']
    })

    const isListOwner = list.user.uuid === tokenUUID

    if (!isListOwner) return false
    return true
  }
}
