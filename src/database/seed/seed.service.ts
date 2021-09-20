import { Injectable } from '@nestjs/common'

import { MainSeeder } from './seeders/main.seed'

@Injectable()
export class SeedService {
  constructor (private mainSeeder: MainSeeder) {}

  async run () {
    await this.mainSeeder.run()
  }
}
