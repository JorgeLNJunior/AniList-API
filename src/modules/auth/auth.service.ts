import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from '@shared/services/bcrypt.service';
import { MailService } from '@shared/services/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private bcrypt: BcryptService,
    private jwt: JwtService,
    private mailService: MailService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    await this.mailService.sendConfirmationEmail(user);
    return user;
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
