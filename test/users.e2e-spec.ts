import { User } from '@http/modules/user/entities/user.entity';
import { BullModule } from '@modules/bull.module';
import { QueueModule } from '@modules/queue/queue.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import * as faker from 'faker';
import * as request from 'supertest';
import { getRepository } from 'typeorm';

import { UserBuilder } from './builder/User.builder';
import { AuthHelper } from './helpers/auth.helper';
import { DatabaseHelper } from './helpers/database.helper';
import { FakeModule } from './helpers/fake.module';

describe('UsersController (e2e)', () => {
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

  it('/users (GET) Should return a list of users', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();
    const { status, body } = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(status).toBe(200);
    expect(body).toHaveProperty('users');
  });

  it('/users (GET) Should return a list of users with query params', async () => {
    const user = await UserBuilder.aUser().persist();
    const token = new AuthHelper(user).sign();

    const query =
      'uuid=19525718-d3b9-4562-b492-37662bc76c34&name=user&email=user@mail.com&take=1&skip=0';

    const { status, body } = await request(app.getHttpServer())
      .get(`/users?${query}`)
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

  it('/users (PATCH) Should update any user with admin permission', async () => {
    const user = await UserBuilder.aUser().persist();

    const admin = await getRepository(User).find({ where: { name: 'admin' } });
    const token = new AuthHelper(admin[0]).sign();

    const name = faker.name.firstName();

    const { status, body } = await request(app.getHttpServer())
      .patch(`/users/${user.uuid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: name });

    expect(status).toBe(200);
    expect(body.user.name).toBe(name);
  });

  it('/users (PATCH) Should update return an error if the user was not found', async () => {
    const admin = await getRepository(User).find({ where: { name: 'admin' } });
    const token = new AuthHelper(admin[0]).sign();

    const name = faker.name.firstName();

    const { status, body } = await request(app.getHttpServer())
      .patch('/users/ba00a97f-5fba-42ca-8122-f9fb6e4d52f4')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: name });

    expect(status).toBe(400);
    expect(body).toHaveProperty('error');
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
