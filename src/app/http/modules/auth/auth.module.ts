import { User } from '@http/modules/user/entities/user.entity'
import { BcryptService } from '@http/shared/services/bcrypt.service'
import { QueueModule } from '@modules/queue/queue.module'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'

@Module({
  imports: [
    PassportModule,
    QueueModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('AUTH_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('AUTH_TOKEN_EXPIRES_IN')
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
