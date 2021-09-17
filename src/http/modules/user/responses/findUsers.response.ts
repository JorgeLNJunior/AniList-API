import { ApiProperty } from '@nestjs/swagger';

import { User } from '../entities/user.entity';

export class FindUsersResponse {
  @ApiProperty({
    default: 200,
  })
  private statusCode: number;

  @ApiProperty({
    example: [
      {
        uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
        name: 'Easton',
        email: 'Easton.Hamill@gmail.com',
        password:
          '$2b$10$DaLu8rQHFH/j6PrD3QS4PuBC6jqaWEnvng95y4HzkPLl/UReJTnpq',
        avatar: 'https://cdn.fakercloud.com/avatars/waghner_128.jpg',
        createdAt: '2021-09-16 14:38:09',
        updatedAt: null,
      },
    ],
  })
  private users: User[];

  constructor(users: User[], status?: number) {
    this.users = users;
    this.statusCode = status || 200;
  }

  build() {
    return {
      statusCode: this.statusCode,
      users: this.users,
    };
  }
}
