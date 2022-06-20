import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AnimeSeeder } from './seeders/anime.seed';
import { ReviewSeeder } from './seeders/review.seed';
import { UserSeeder } from './seeders/user.seed';
import { UserAnimeListSeeder } from './seeders/userAnimeList.seed';

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    private userSeeder: UserSeeder,
    private animeSeeder: AnimeSeeder,
    private reviewSeeder: ReviewSeeder,
    private userAnimeListSeeder: UserAnimeListSeeder,
    private configService: ConfigService,
  ) {}

  async run() {
    try {
      const runSeeds = this.configService.get<boolean>('RUN_SEEDS');
      if (!runSeeds) return;

      await Promise.all([this.userSeeder.run(), this.animeSeeder.run()]);

      // depends on user and anime seeders
      await Promise.all([
        this.reviewSeeder.run(),
        this.userAnimeListSeeder.run(),
      ]);

      this.logger.log('All seeds finished');
    } catch (error) {
      this.logger.error('Seed service error', error);
    }
  }
}
