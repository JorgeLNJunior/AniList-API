import { ApiProperty } from '@nestjs/swagger'

import { Vote } from '../entities/vote.entity'

export class CreateVoteResponse {
  @ApiProperty({
    default: 201
  })
  private statusCode: number;

  @ApiProperty({
    example: {
      uuid: '7397f870-20d8-424c-b9f2-c49d3129c650',
      createdAt: '2021-09-27T22:27:51.000Z',
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
        uuid: '150e0f98-14be-45f2-ad14-3f214ba34781',
        title: 'nam non expedita',
        description: 'Maiores et ut non saepe. Qui voluptas maxime expedita aperiam. Omnis voluptates dolor asperiores facilis quo laborum. Explicabo corporis ut nihil aperiam veniam tempora. Molestias iure temporibus provident atque soluta.',
        rating: 2,
        createdAt: '2021-09-25T20:12:15.000Z',
        updatedAt: null,
        deletedAt: null
      },
    }
  })
  private vote: Vote;

  constructor(vote: Vote, status?: number) {
    this.vote = vote
    this.statusCode = status || 201
  }

  build() {
    return {
      statusCode: this.statusCode,
      vote: this.vote
    }
  }
}
