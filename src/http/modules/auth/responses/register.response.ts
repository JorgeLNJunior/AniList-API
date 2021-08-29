import { User } from '@http/modules/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResponse {
  constructor(user: User, status?: number, message?: string) {
    this.user = user;
    this.status = status || 201;
    this.message = message || 'please confirm your email address';
  }

  @ApiProperty({ default: 201 })
  private status: number;

  @ApiProperty({ default: 'please confirm your email address' })
  private message: string;

  @ApiProperty({
    example: {
      uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
      name: 'Easton',
      email: 'Easton.Hamill@gmail.com',
      password: '$2b$10$DaLu8rQHFH/j6PrD3QS4PuBC6jqaWEnvng95y4HzkPLl/UReJTnpq',
      avatar: null,
    },
  })
  private user: User;

  build() {
    return {
      statusCode: this.status,
      user: this.user,
      message: this.message,
    };
  }
}
