import { User } from '@http/modules/user/entities/user.entity';
import { BcryptService } from '@http/shared/services/bcrypt.service';
import * as faker from 'faker';
import { getRepository } from 'typeorm';

export class UserBuilder {
  private user: FakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    avatar: faker.internet.avatar(),
    isAdmin: false,
    isEmailConfirmed: false,
  };

  static aUser() {
    return new UserBuilder();
  }

  withoutAvatar() {
    delete this.user.avatar;
    return this;
  }

  withoutName() {
    delete this.user.name;
    return this;
  }

  withoutEmail() {
    delete this.user.email;
    return this;
  }

  withoutPassword() {
    delete this.user.password;
    return this;
  }

  withName(name: string) {
    this.user.name = name;
    return this;
  }

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withEmailConfirmed() {
    this.user.isEmailConfirmed = true;
    return this;
  }

  withPassword(password: string) {
    this.user.password = password;
    return this;
  }

  async persist() {
    const bcrypt = new BcryptService();
    const userRespository = getRepository(User);

    this.user.password = await bcrypt.hash(this.user.password);

    const user = userRespository.create(this.user);
    return userRespository.save(user);
  }

  build() {
    return this.user;
  }
}

export interface FakeUser {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  isAdmin?: boolean;
  isEmailConfirmed?: boolean;
}
