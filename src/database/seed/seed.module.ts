import { HttpModule } from '@nestjs/axios'
import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { SeedService } from './seed.service'
import { AnimeSeeder } from './seeders/anime.seed'
import { MainSeeder } from './seeders/main.seed'
import { ReviewSeeder } from './seeders/review.seed'
import { UserSeeder } from './seeders/user.seed'

@Module({
  imports: [HttpModule],
  providers: [MainSeeder, UserSeeder, AnimeSeeder, ReviewSeeder, SeedService]
})
export class SeedModule implements OnApplicationBootstrap {
  constructor (private seederService: SeedService) {}

  async onApplicationBootstrap () {
    await this.seederService.run()
  }
}
