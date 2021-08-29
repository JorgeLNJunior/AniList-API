import { User } from '@http/modules/user/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export class AuthHelper {
  private user: User;
  private jwt: JwtService;
  private config: ConfigService;

  constructor(user: User) {
    this.user = user;
    this.config = new ConfigService();
    this.jwt = new JwtService({
      secret: this.config.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: this.config.get<string>('JWT_EXPIRES'),
      },
    });
  }

  sign() {
    const payload = { uuid: this.user.uuid, isAdmin: this.user.isAdmin };
    return this.jwt.sign(payload);
  }
}
