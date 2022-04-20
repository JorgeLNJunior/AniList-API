import { PaginationInterface } from '@http/shared/pagination/pagination.interface'
import { ApiProperty } from '@nestjs/swagger'

import { Vote } from '../entities/vote.entity';

export class FindVoteResponse {
  @ApiProperty({ default: 200 })
  private statusCode: number;

  @ApiProperty({
    example: [
      {
        uuid: '4b493deb-3923-4fe8-bf76-8e62a5d3aa18',
        createdAt: '2021-09-25T23:21:39.000Z',
        updatedAt: null,
        deletedAt: null,
        user: {
          uuid: '2183467f-42ba-44cd-913d-e4f53de5ca61',
          name: 'admin',
          email: 'admin@mail.com',
          password: '$2b$10$oGLTkplt09K5K5ib9RQ/oeYPy9SoIkcSTw6rB8sfAPShuG/dV9V9q',
          avatar: 'http://localhost:3000/user/avatar/default.jpg',
          isAdmin: true,
          isActive: true,
          createdAt: '2021-09-25T23:12:08.000Z',
          updatedAt: null,
          deletedAt: null
        },
        review: {
          uuid: '0f620699-3acc-4f83-a5fb-2f446151d0e0',
          title: 'consequatur qui qui',
          description: 'Quaerat illum eius molestiae sit atque molestias possimus. Quam officiis officia quis vel illo distinctio dolor laudantium. Sed labore similique quam velit quibusdam et rerum rerum. Distinctio ad qui tenetur saepe. Corporis sed veniam ut doloremque est.',
          rating: 1,
          createdAt: '2021-09-25T20:12:16.000Z',
          updatedAt: null,
          deletedAt: null
        }
      }
    ]
  })
  private votes: PaginationInterface<Vote>;

  @ApiProperty({
    example: 20
  })
  private readonly pageTotal: number;

  @ApiProperty({
    example: 80
  })
  private readonly total: number;

  constructor(votes: PaginationInterface<Vote>, status?: number) {
    this.votes = votes
    this.statusCode = status || 200
  }

  build() {
    return {
      statusCode: this.statusCode,
      votes: this.votes.results,
      pageTotal: this.votes.pageTotal,
      total: this.votes.total
    }
  }
}
