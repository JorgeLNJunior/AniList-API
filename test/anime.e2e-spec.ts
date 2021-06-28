import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';

import { AnimeBuilder } from './builder/Anime.builder';
import { DatabaseHelper } from './helpers/database.helper';

describe('AnimeController (e2e)', () => {
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

  it('/animes (GET) Should return a list of animes', async () => {
    const { status, body } = await request(app.getHttpServer()).get('/animes');

    expect(status).toBe(200);
    expect(body).toHaveProperty('animes');
  });

  it('/animes (POST) Should create a anime', async () => {
    const anime = AnimeBuilder.aAnime().withoutCover().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .send(anime);

    expect(status).toBe(201);
    expect(body).toHaveProperty('anime');
  });

  it('/animes (POST) Should not create a anime without title', async () => {
    const anime = AnimeBuilder.aAnime().withoutCover().withoutTitle().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create a anime without synopsis', async () => {
    const anime = AnimeBuilder.aAnime()
      .withoutCover()
      .withoutSynopsis()
      .build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create a anime without trailer', async () => {
    const anime = AnimeBuilder.aAnime().withoutCover().withoutTrailer().build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/animes (POST) Should not create a anime without episodes', async () => {
    const anime = AnimeBuilder.aAnime()
      .withoutCover()
      .withoutEpisodes()
      .build();
    const { status, body } = await request(app.getHttpServer())
      .post('/animes')
      .send(anime);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
