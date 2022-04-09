import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../entities/user.entity'

export class FindUsersResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: [
      {
        uuid: '1c12dd97-839e-4058-91f0-e75934b02d52',
        name: 'Easton',
        email: 'easton.hamill@gmail.com',
        password:
          '$2b$10$DaLu8rQHFH/j6PrD3QS4PuBC6jqaWEnvng95y4HzkPLl/UReJTnpq',
        avatar: 'https://cdn.fakercloud.com/avatars/waghner_128.jpg',
        createdAt: '2021-09-16 14:38:09',
        updatedAt: null
      }
    ]
  })
  private users: PaginationInterface<User>;

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor(users: PaginationInterface<User>, status?: number) {
    this.users = users
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      users: this.users.results,
      pageTotal: this.users.pageTotal,
      total: this.users.total
    }
  }
}
