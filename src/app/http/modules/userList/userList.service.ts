import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddToUserListDto } from './dto/addToUserList.dto';
import { UpdateUserListDto } from './dto/updateUserList.dto';
import { UserList } from './entities/userList.entity';

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

  findAll() {
    return `This action returns all userList`;
  }

  async update(uuid: string, updateUserListDto: UpdateUserListDto) {
    await this.userListRepository.update(uuid, updateUserListDto)
    return this.userListRepository.findOne(uuid, { relations: ['user', 'anime'] })
  }

  remove(id: number) {
    return `This action removes a #${id} userList`;
  }
}
