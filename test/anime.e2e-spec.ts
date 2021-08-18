import { User } from '@modules/user/entities/user.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';
import { getRepository, Repository } from 'typeorm';

import { AnimeBuilder } from './builder/Anime.builder';
import { UserBuilder } from './builder/User.builder';
import { AuthHelper } from './helpers/auth.helper';
import { DatabaseHelper } from './helpers/database.helper';

describe('AnimeController (e2e)', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;

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

    userRepository = getRepository(User);
  });
  afterEach(async () => await app.close());
  afterAll(async () => await DatabaseHelper.dropDatabase());

  it('/animes (GET) Should return a list of animes', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const { status, body } = await request(app.getHttpServer())
      .get('/animes')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('animes');
  });

  it('/animes (GET) Should return a list of animes with query params', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const query =
      'uuid=19525718-d3b9-4562-b492-37662bc76c34&title=one+piece&episodes=50&take=1&skip=0';

    const { status, body } = await request(app.getHttpServer())
      .get(`/animes?${query}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('animes');
  });

  it('/animes (GET) Should return top 10 animes', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const { status, body } = await request(app.getHttpServer())
      .get('/animes/top')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('animes');
  });

  it('/animes (POST) Should create an anime', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime().withoutCover().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(201);
    expect(body).toHaveProperty('anime');
  });

  it('/animes (POST) Should not create an anime if the user was not the admin', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const anime = AnimeBuilder.aAnime().withoutCover().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(403);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create an anime without title', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime().withoutCover().withoutTitle().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create an anime without synopsis', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime()
      .withoutCover()
      .withoutSynopsis()
      .build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create an anime without trailer', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime().withoutCover().withoutTrailer().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create an anime without a valid trailer url', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime()
      .withoutCover()
      .withTrailer('invalid trailer')
      .build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create an anime without episodes', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const anime = AnimeBuilder.aAnime()
      .withoutCover()
      .withoutEpisodes()
      .build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .set('Authorization', `Bearer ${token}`)
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (PATCH) Should update the anime title', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const { uuid } = await AnimeBuilder.aAnime().persist();
    const { title } = AnimeBuilder.aAnime().build();
    const { status, body } = await request(app.getHttpServer())
      .patch(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: title });

    expect(status).toBe(200);
    expect(body).toHaveProperty('anime');
    expect(body.anime.title).toBe(title);
  });

  it('/animes (PATCH) Should update the anime synopsis', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const { uuid } = await AnimeBuilder.aAnime().persist();
    const { synopsis } = AnimeBuilder.aAnime().build();
    const { status, body } = await request(app.getHttpServer())
      .patch(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ synopsis: synopsis });

    expect(status).toBe(200);
    expect(body).toHaveProperty('anime');
    expect(body.anime.synopsis).toBe(synopsis);
  });

  it('/animes (PATCH) Should update the anime trailer', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const { uuid } = await AnimeBuilder.aAnime().persist();
    const { trailer } = AnimeBuilder.aAnime().build();
    const { status, body } = await request(app.getHttpServer())
      .patch(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ trailer: trailer });

    expect(status).toBe(200);
    expect(body).toHaveProperty('anime');
    expect(body.anime.trailer).toBe(trailer);
  });

  it('/animes (PATCH) Should update the anime episodes', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const { uuid } = await AnimeBuilder.aAnime().persist();
    const { episodes } = AnimeBuilder.aAnime().build();
    const { status, body } = await request(app.getHttpServer())
      .patch(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ episodes: episodes });

    expect(status).toBe(200);
    expect(body).toHaveProperty('anime');
    expect(body.anime.episodes).toBe(episodes);
  });

  it('/animes (PATCH) Should return an error if the anime was not found', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const uuid = '19525718-d3b9-4562-b492-37662bc76c34';
    const { episodes } = AnimeBuilder.aAnime().build();
    const { status, body } = await request(app.getHttpServer())
      .patch(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ episodes: episodes });

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (DELETE) Should delete an anime', async () => {
    const adminUser = await userRepository.find({ where: { name: 'admin' } });
    const token = new AuthHelper(adminUser[0]).sign();

    const { uuid } = await AnimeBuilder.aAnime().persist();
    const { status, body } = await request(app.getHttpServer())
      .delete(`/animes/${uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  });
});
