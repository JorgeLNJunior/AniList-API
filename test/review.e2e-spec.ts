import { BullModule } from '@modules/bull.module';
import { QueueModule } from '@modules/queue/queue.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { useContainer } from 'class-validator';
import * as request from 'supertest';

import { AnimeBuilder } from './builder/Anime.builder';
import { ReviewBuilder } from './builder/Review.builder';
import { UserBuilder } from './builder/User.builder';
import { AuthHelper } from './helpers/auth.helper';
import { DatabaseHelper } from './helpers/database.helper';
import { FakeModule } from './helpers/fake.module';

describe('ReviewController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(BullModule)
      .useClass(FakeModule)
      .overrideProvider(QueueModule)
      .useClass(FakeModule)
      .compile();

    app = moduleFixture.createNestApplication();
    useContainer(app, { fallbackOnErrors: true });
    app.useGlobalPipes(
      new ValidationPipe({
        forbidUnknownValues: true,
        whitelist: true,
      }),
    );
    await app.init();
  });
  afterEach(async () => await app.close());
  afterAll(async () => await DatabaseHelper.dropDatabase());

  it('/reviews (GET) Should return a list of reviews', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const { status, body } = await request(app.getHttpServer())
      .get('/reviews')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('reviews');
  });

  it('/reviews (GET) Should return a list of reviews with query', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const query =
      'uuid=19525718-d3b9-4562-b492-37662bc76c34&animeUuid=19525718-d3b9-4562-b492-37662bc76c34userUuid=19525718-d3b9-4562-b492-37662bc76c34&&take=1&skip=0';

    const { status, body } = await request(app.getHttpServer())
      .get(`/reviews?${query}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('reviews');
  });

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

  it('/reviews (POST) Should not create a duplicated review review', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const review = ReviewBuilder.aReview().withAnime(anime).build();

    await ReviewBuilder.aReview().withAnime(anime).withUser(user).persist();

    const { status, body } = await request(app.getHttpServer())
      .post('/reviews')
      .set('Authorization', `Bearer ${token}`)
      .send(review);

    expect(status).toBe(400);
    expect(body).toHaveProperty('message');
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

  it('/reviews (PATCH) Should update the review title', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();
    const { title } = ReviewBuilder.aReview().build();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: title });

    expect(status).toBe(200);
    expect(body.review.title).toBe(title);
    expect(body).toHaveProperty('review');
  });

  it('/reviews (PATCH) Should update the review description', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();
    const { description } = ReviewBuilder.aReview().build();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ description: description });

    expect(status).toBe(200);
    expect(body.review.description).toBe(description);
    expect(body).toHaveProperty('review');
  });

  it('/reviews (PATCH) Should update the review rating', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();
    const { rating } = ReviewBuilder.aReview().build();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ rating: rating });

    expect(status).toBe(200);
    expect(body.review.rating).toBe(rating);
    expect(body).toHaveProperty('review');
  });

  it('/reviews (PATCH) Should not delete a review if the user has no permission', async () => {
    const user = await UserBuilder.aUser().persist();
    const unauthorizedUser = await UserBuilder.aUser().persist();
    const token = new AuthHelper(unauthorizedUser).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();
    const { title } = ReviewBuilder.aReview().build();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: title });

    expect(status).toBe(403);
    expect(body).toHaveProperty('error');
  });

  it('/reviews (DELETE) Should delete a review', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();

    const { status, body } = await request(app.getHttpServer())
      .delete(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  });

  it('/reviews (DELETE) Should return an error if the review was not found', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const uuid = '22a9849b-4c8f-4489-8797-fea8073d4db6';

    const { status, body } = await request(app.getHttpServer())
      .delete(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  // eslint-disable-next-line jest/no-identical-title
  it('/reviews (DELETE) Should delete a review', async () => {
    const user = await UserBuilder.aUser().persist();
    const unauthorizedUser = await UserBuilder.aUser().persist();
    const token = new AuthHelper(unauthorizedUser).sign();

    const anime = await AnimeBuilder.aAnime().persist();
    const { uuid } = await ReviewBuilder.aReview()
      .withAnime(anime)
      .withUser(user)
      .persist();

    const { status, body } = await request(app.getHttpServer())
      .delete(`/reviews/${uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(403);
    expect(body).toHaveProperty('message');
  });
});
