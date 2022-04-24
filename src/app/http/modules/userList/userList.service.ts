import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddToUserListDto } from './dto/addToUserList.dto';
import { UpdateUserListDto } from './dto/updateUserList.dto';
import { UserList } from './entities/userList.entity';
import { UserListQueryBuilder } from './query/userList.query.builder';
import { UserListQuery } from './query/userList.query.interface';

@Injectable()
export class UserListService {
  constructor(
    @InjectRepository(UserList) private userListRepository: Repository<UserList>
  ) { }

  async addToList(userUUID: string, addToUserListDto: AddToUserListDto) {
    const review = this.userListRepository.create({
      user: { uuid: userUUID },
      anime: { uuid: addToUserListDto.animeUuid },
      status: addToUserListDto.status
    });

    const result = await this.userListRepository.save(review)

    return this.userListRepository.findOne(result.uuid, { relations: ['user', 'anime'] })
  }

  async find(query: UserListQuery) {
    const findOptions = new UserListQueryBuilder(query)

    return this.userListRepository.find({
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
      where: findOptions
    })
  }

  async update(uuid: string, updateUserListDto: UpdateUserListDto) {
    await this.userListRepository.update(uuid, updateUserListDto)
    return this.userListRepository.findOne(uuid, { relations: ['user', 'anime'] })
  }

  async remove(uuid: string) {
    await this.userListRepository.softDelete(uuid);
  }
}
