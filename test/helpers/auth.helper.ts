import { Constants } from '@config/constants';
import { User } from '@modules/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

export class AuthHelper {
  private user: User;
  private jwt: JwtService;

  constructor(user: User) {
    this.user = user;
    this.jwt = new JwtService(Constants.jwtOptions());
  }

  sign() {
    const payload = { uuid: this.user.uuid };
    return this.jwt.sign(payload);
  }
}
