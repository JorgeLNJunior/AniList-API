import { CreateUserDto } from '@modules/user/dto/create-user.dto';
import { User } from '@modules/user/entities/user.entity';
import { UserService } from '@modules/user/user.service';
import { InjectQueue } from '@nestjs/bull';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from '@shared/services/bcrypt.service';
import { Queue } from 'bull';
import { Repository } from 'typeorm';

import { EmailConfirmationDto } from './dto/email-confirmation.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectQueue('email') private mailQueue: Queue,
    @InjectRepository(User) private userRepository: Repository<User>,
    private userService: UserService,
    private bcrypt: BcryptService,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    await this.mailQueue.add('email-confirmation', { user: user });
    return user;
  }

  async login(user: User) {
    const payload = { uuid: user.uuid, isAdmin: user.isAdmin };
    return this.jwt.sign(payload);
  }

  async confirmEmail(dto: EmailConfirmationDto) {
    const email = this.decodeToken(dto.token);
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new BadRequestException('user not found');
    }
    if (user.isEmailConfirmed) {
      throw new BadRequestException('email already confirmed');
    }

    await this.userRepository.update(user.uuid, { isEmailConfirmed: true });
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

  private decodeToken(token: string) {
    try {
      const payload = this.jwt.verify(token, {
        secret: this.configService.get<string>('JWT_VERIFICATION_TOKEN_SECRET'),
      });
      return payload.email;
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Invalid token');
    }
  }
}
