import { Constants } from '@config/constants';
import { User } from '@modules/user/entities/user.entity';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from '@shared/modules/queue/queue.module';
import { BcryptService } from '@shared/services/bcrypt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    QueueModule,
    JwtModule.registerAsync({
      useFactory: () => Constants.jwtOptions(),
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    LocalStrategy,
    JwtStrategy,
    Constants,
  ],
})
export class AuthModule {}
