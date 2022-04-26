import { BadRequestException, CanActivate, ExecutionContext } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { UserList } from "../entities/userList.entity";

export class IsAlreadyInUserListGuard implements CanActivate {
  constructor(
    @InjectRepository(UserList) private userListRepository: Repository<UserList>
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userUUID = context.switchToHttp().getRequest().user.uuid
    const animeUUID = context.switchToHttp().getRequest().body.animeUuid

    const isAlreadyInUserList = await this.userListRepository.findOne({
      where: {
        user: { uuid: userUUID },
        anime: { uuid: animeUUID }
      }
    })
    if (isAlreadyInUserList) throw new BadRequestException(['this anime is already in your list'])
    return true
  }
}
