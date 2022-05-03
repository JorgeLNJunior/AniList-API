import faker from "@faker-js/faker";
import { User } from "@http/modules/user/entities/user.entity";

export class UserBuilder {
  private uuid: string;
  private name: string
  private email: string
  private password: string
  private avatar: string
  private isAdmin: boolean
  private isActive: boolean
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor() {
    this.uuid = faker.datatype.uuid()
    this.name = faker.name.firstName()
    this.email = faker.internet.email(this.name)
    this.password = faker.internet.password()
    this.avatar = faker.internet.avatar()
    this.isAdmin = false
    this.isActive = true
    this.createdAt = new Date()
    this.updatedAt = null
    this.deletedAt = null
  }

  build() {
    const user = new User()
    user.uuid = this.uuid
    user.name = this.name
    user.email = this.email
    user.password = this.password
    user.avatar = this.avatar
    user.isAdmin = this.isAdmin
    user.isActive = this.isActive
    user.createdAt = this.createdAt
    user.updatedAt = this.updatedAt
    user.deletedAt = this.deletedAt
    return user
  }

  withUUID(uuid: string): UserBuilder {
    this.uuid = uuid
    return this
  }

  withName(name: string): UserBuilder {
    this.name = name
    return this
  }

  withEmail(email: string): UserBuilder {
    this.email = email
    return this
  }

  withPassword(password: string): UserBuilder {
    this.password = password
    return this
  }

  withIsAdmin(isAdmin: boolean): UserBuilder {
    this.isAdmin = isAdmin
    return this
  }

  withIsActive(isActive: boolean): UserBuilder {
    this.isActive = isActive
    return this
  }

}
