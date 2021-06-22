import { PrismaService } from '@shared/services/prisma.service';
import * as faker from 'faker';

export class UserBuilder {
  private user: FakeUser = {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(6),
    avatar: faker.internet.avatar(),
  };
  private prisma = new PrismaService();

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

  withEmail(email: string) {
    this.user.email = email;
    return this;
  }

  withPassword(password: string) {
    this.user.password = password;
    return this;
  }

  async persist() {
    const user = await this.prisma.user.create({ data: this.user });
    this.prisma.$disconnect();
    return user;
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
}
