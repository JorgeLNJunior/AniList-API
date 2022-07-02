import { HttpService } from '@http/shared/services/http.service'
import { Module, OnApplicationBootstrap } from '@nestjs/common'

import { SeedService } from './seed.service'
import { AnimeSeeder } from './seeders/anime.seed'
import { ReviewSeeder } from './seeders/review.seed'
import { UserSeeder } from './seeders/user.seed'
import { UserAnimeListSeeder } from './seeders/userAnimeList.seed'

@Module({
  providers: [
    UserSeeder,
    AnimeSeeder,
    ReviewSeeder,
    UserAnimeListSeeder,
    SeedService,
    HttpService
  ]
})
export class SeedModule implements OnApplicationBootstrap {
  constructor(private seederService: SeedService) {}

  async onApplicationBootstrap() {
    await this.seederService.run()
  }
}
