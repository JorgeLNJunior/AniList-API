import { Injectable } from '@nestjs/common';
import { BcryptService } from '@shared/services/bcrypt.service';
import { PrismaService } from '@shared/services/prisma.service';

import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private bcrypt: BcryptService) {}

  async register(registerDto: RegisterDto) {
    const passwordHash = await this.bcrypt.hash(registerDto.password);
    registerDto.password = passwordHash;

    return this.prisma.user.create({
      data: registerDto,
    });
  }
}
