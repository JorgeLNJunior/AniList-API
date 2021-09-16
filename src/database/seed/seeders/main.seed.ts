import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AnimeSeeder } from './anime.seed';
import { ReviewSeeder } from './review.seed';
import { UserSeeder } from './user.seed';

@Injectable()
export class MainSeeder {
  private readonly logger = new Logger(MainSeeder.name);

  constructor(
    private userSeeder: UserSeeder,
    private animeSeeder: AnimeSeeder,
    private reviewSeeder: ReviewSeeder,
    private configService: ConfigService,
  ) {}

  async run() {
    try {
      const runSeeds = this.configService.get<boolean>('RUN_SEEDS');
      if (!runSeeds) return;

      await this.userSeeder.run();
      await this.animeSeeder.run();
      await this.reviewSeeder.run();

      this.logger.log('All seeds finished');
    } catch (error) {
      this.logger.error('Main seeder error', error.message);
    }
  }
}
