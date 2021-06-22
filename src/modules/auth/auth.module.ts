import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { BcryptService } from '@shared/services/bcrypt.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule],
  controllers: [AuthController],
  providers: [AuthService, BcryptService],
})
export class AuthModule {}
