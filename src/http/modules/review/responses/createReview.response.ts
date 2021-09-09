import { ApiProperty } from '@nestjs/swagger';

import { Review } from '../entities/review.entity';

export class CreateReviewResponse {
  @ApiProperty({ default: 201 })
  private statusCode: number;

  @ApiProperty({
    example: {
      uuid: 'b852dcea-f442-4141-97f5-0567d9f25b1d',
      title: 'naruto',
      description: 'Proin at pulvinar enim, eget vulputate sem...',
      rating: 4,
      anime: {
        uuid: '5fe7e1fb-1341-4625-bbaf-72688a697624',
        title: 'naruto',
        synopsis: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
        cover:
          'https://betteranime.net/storage/cover/746cd6f190bdff4bcd01bfea06d500971ac4921f32b31a47274c345d20df4afb.jpg',
        trailer: 'youtube.com/watch?v=j2hiC9BmJlQ',
        episodes: 200,
        releaseDate: '2020-10-15',
      },
      user: {
        uuid: 'd83c3162-923a-4cb2-8ec5-d3bc5f3c38a6',
        name: 'user',
        email: 'user@mail.com',
        password:
          '$2b$10$i0vQ/xHd8t2ozS4TQaZeTudbGvJzQd/DPCHF6EC/scsiX9JNf1pA6',
        avatar:
          'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg',
      },
    },
  })
  private review: Review;

  constructor(review: Review, status?: number) {
    this.review = review;
    this.statusCode = status || 201;
  }

  build() {
    return {
      statusCode: this.statusCode,
      review: this.review,
    };
  }
}
