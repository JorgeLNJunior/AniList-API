import { PaginationInterface } from '@http/shared/pagination/pagination.interface';
import { BadRequestException, Injectable } from '@nestjs/common';
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
    const isAlreadyInUserList = await this.userListRepository.findOne({
      where: {
        user: { uuid: userUUID },
        anime: { uuid: addToUserListDto.animeUuid }
      }
    })
    if (isAlreadyInUserList) throw new BadRequestException(['this anime is already in your list'])

    const review = this.userListRepository.create({
      user: { uuid: userUUID },
      anime: { uuid: addToUserListDto.animeUuid },
      status: addToUserListDto.status
    });

    const result = await this.userListRepository.save(review)

    return this.userListRepository.findOne(result.uuid, {
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
    })
  }

  async find(query: UserListQuery): Promise<PaginationInterface<UserList>> {
    const findOptions = new UserListQueryBuilder(query).build()

    const total = await this.userListRepository.count({
      where: findOptions.where
    })
    const list = await this.userListRepository.find({
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
      ...findOptions
    })

    return {
      results: list,
      pageTotal: list.length,
      total: total
    }
  }

  async update(uuid: string, updateUserListDto: UpdateUserListDto) {
    await this.userListRepository.update(uuid, updateUserListDto)
    return this.userListRepository.findOne(uuid, {
      loadRelationIds: {
        disableMixedMap: true,
        relations: ['anime', 'user']
      },
    })
  }

  async remove(uuid: string) {
    await this.userListRepository.softDelete(uuid);
  }
}
