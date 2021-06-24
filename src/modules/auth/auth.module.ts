import { Constants } from '@config/constants';
import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { BcryptService } from '@shared/services/bcrypt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register(new Constants().jwtOptions()),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
