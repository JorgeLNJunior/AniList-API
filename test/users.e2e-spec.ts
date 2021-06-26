import { User } from '@modules/user/entities/user.entity';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as faker from 'faker';
import * as request from 'supertest';

import { UserBuilder } from './builder/User.builder';
import { AuthHelper } from './helpers/auth.helper';
import { DatabaseHelper } from './helpers/database.helper';

describe('UsersController (e2e)', () => {
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

  it('/users (GET) Should return a list of users', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();
    const { status, body } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  it('/users (PATCH) Should update the user name', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();
    const name = faker.name.firstName();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/users/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: name });

    expect(status).toBe(200);
    expect(body.user.name).toBe(name);
  });

  it('/users (PATCH) Should not update a user without permissions', async () => {
    const user = await UserBuilder.aUser().persist();
    const userWithoutPermissions = await UserBuilder.aUser().persist();
    const token = new AuthHelper(userWithoutPermissions).sign();
    const name = faker.name.firstName();

    const { status } = await request(app.getHttpServer())
      .patch(`/users/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: name });

    expect(status).toBe(403);
  });

  it('/users (DELETE) Should delete a user', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const { status, body } = await request(app.getHttpServer())
      .delete(`/users/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('message');
  });

  it('/users (DELETE) Should not delete a user without permissions', async () => {
    const user = await UserBuilder.aUser().persist();
    const userWithoutPermissions = await UserBuilder.aUser().persist();
    const token = new AuthHelper(userWithoutPermissions).sign();

    const { status } = await request(app.getHttpServer())
      .delete(`/users/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(403);
  });
});
