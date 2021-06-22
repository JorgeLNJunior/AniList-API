import { User } from '@prisma/client';

export class RegisterResponse {
  constructor(user: User, status?: number) {
    this.user = user;
    this.status = status || 201;
  }

  private user: User;
  private status: number;

  build() {
    return {
      statusCode: this.status,
      user: this.user,
    };
  }
}
