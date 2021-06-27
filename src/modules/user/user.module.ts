import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BcryptService } from '@shared/services/bcrypt.service';
import { config } from 'dotenv';

import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

config({ path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env' }); // cloudnary

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, BcryptService],
  exports: [UserService],
})
export class UserModule {}
