import { Constants } from '@config/constants';
import { User } from '@http/modules/user/entities/user.entity';
import { UserModule } from '@http/modules/user/user.module';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from '@src/http/shared/modules/queue/queue.module';
import { BcryptService } from '@src/http/shared/services/bcrypt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { LocalStrategy } from './strategy/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    QueueModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigService],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES'),
        },
      }),
    }),
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
