import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@shared/services/bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcrypt: BcryptService,
    private jwt: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('this email is not registered');
    }

    const isSamePassword = await this.bcrypt.compare(password, user.password);

    if (!isSamePassword) {
      throw new UnauthorizedException('wrong credentials');
    }

    return user;
  }

  async login(user: User) {
    const payload = { uuid: user.uuid, isAdmin: user.isAdmin };
    return this.jwt.sign(payload);
  }
}
