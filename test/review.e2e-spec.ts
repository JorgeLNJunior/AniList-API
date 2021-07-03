import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';

import { AnimeBuilder } from './builder/Anime.builder';
import { ReviewBuilder } from './builder/Review.builder';
import { UserBuilder } from './builder/User.builder';
import { AuthHelper } from './helpers/auth.helper';
import { DatabaseHelper } from './helpers/database.helper';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
      }),
    );
    await app.init();
  });
  afterEach(() => app.close());
  afterAll(async () => await DatabaseHelper.dropDatabase());

  // it('/reviews (GET) Should return a list of reviews', async () => {
  //   const user = await UserBuilder.aUser().persist();
  //   const token = new AuthHelper(user).sign();

  //   const { status, body } = await request(app.getHttpServer())
  //     .get('/reviews')
  //     .set('Authorization', `Bearer ${token}`);

  //   expect(status).toBe(200);
  //   expect(body).toHaveProperty('reviews');
  // });

  it('/reviews (POST) Should create a review', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const review = ReviewBuilder.aReview().withAnime(anime).build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(201);
    expect(body).toHaveProperty('review');
  });

  it('/reviews (POST) Should not create a review without a title', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const review = ReviewBuilder.aReview()
      .withAnime(anime)
      .withoutTitle()
      .build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (POST) Should not create a review without a description', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const review = ReviewBuilder.aReview()
      .withAnime(anime)
      .withoutDescription()
      .build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (POST) Should not create a review without a rating', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const review = ReviewBuilder.aReview()
      .withAnime(anime)
      .withoutRating()
      .build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (POST) Should not create a review without an anime', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const review = ReviewBuilder.aReview().withoutAnime().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (POST) Should not create a review with a rating greater than 5', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const review = ReviewBuilder.aReview().withRating(6).build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (POST) Should not create a review with a rating less than 1', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const review = ReviewBuilder.aReview().withRating(0).build();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
