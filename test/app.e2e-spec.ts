import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@shared/services/prisma.service';
import { AppModule } from '@src/app.module';
import * as request from 'supertest';

import { UserBuilder } from './builder/User.builder';
import { DatabaseHelper } from './helpers/database.helper';

describe('AppController (e2e)', () => {
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
  beforeAll(async () => await new DatabaseHelper().truncate());
  afterAll(async () => await new DatabaseHelper().truncate());

  it('/register (POST) Should register a new user', async () => {
    const user = UserBuilder.aUser().withoutAvatar().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(201);
    expect(body).toHaveProperty('user');
  });

  it('/register (POST) Should not register a user without name', async () => {
    const user = UserBuilder.aUser().withoutAvatar().withoutName().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) Should not register a user without email', async () => {
    const user = UserBuilder.aUser().withoutAvatar().withoutEmail().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) Should not register a user without password', async () => {
    const user = UserBuilder.aUser().withoutAvatar().withoutPassword().build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) Should not register a user with password lenght less than 6', async () => {
    const password = '123';
    const user = UserBuilder.aUser()
      .withoutAvatar()
      .withPassword(password)
      .build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) Should not register a user with a invalid email adress', async () => {
    const email = 'invalid-email';
    const user = UserBuilder.aUser().withoutAvatar().withEmail(email).build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });

  it('/register (POST) Should not register a user with a registered email', async () => {
    const { email } = await UserBuilder.aUser()
      .withEmail('user@mail.com')
      .persist();
    const user = UserBuilder.aUser().withoutAvatar().withEmail(email).build();

    const { status, body } = await request(app.getHttpServer())
      .post('/register')
      .send(user);

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
  });
});
