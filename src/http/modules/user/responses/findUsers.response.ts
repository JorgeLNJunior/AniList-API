import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { User } from '../entities/user.entity'

export class FindUsersResponse {
  @ApiProperty({
    default: 200
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      results: [
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
      ],
      pageTotal: 20,
      total: 50
    }
  })
  private results: PaginationInterface<User>;

  constructor (results: PaginationInterface<User>, status?: number) {
    this.results = results
    this.statusCode = status || 200
  }

  build () {
    return {
      statusCode: this.statusCode,
      ...this.results
    }
  }
}
