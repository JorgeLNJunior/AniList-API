import { Module } from '@nestjs/common';
import { BcryptService } from '@shared/services/bcrypt.service';
import { PrismaService } from '@shared/services/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, BcryptService],
})
export class AuthModule {}
