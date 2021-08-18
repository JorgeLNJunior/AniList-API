import { User } from '@modules/user/entities/user.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { AuthHelper } from './helpers/auth.helper';

describe('HealthController (e2e)', () => {
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
  afterEach(async () => await app.close());

  it('/animes (GET) Should return a list of health checks', async () => {
    const user = await getRepository(User).find({ where: { name: 'admin' } });
    const token = new AuthHelper(user[0]).sign();

    const { status, body } = await request(app.getHttpServer())
      .get('/health')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('status');
  });
});
