import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
