import { SeedModule } from '@database/seed/seed.module';
import { AnimeModule } from '@http/modules/anime/anime.module';
import { AuthModule } from '@http/modules/auth/auth.module';
import { ReviewModule } from '@http/modules/review/review.module';
import { UserModule } from '@http/modules/user/user.module';
import { UserAnimeListModule } from '@http/modules/userAnimeList/userAnimeList.module';
import { VoteModule } from '@http/modules/vote/vote.module';
import { BullModule } from '@modules/bull.module';
import { ConfigModule } from '@modules/config.module';
import { DatabaseModule } from '@modules/database.module';
import { QueueModule } from '@modules/queue/queue.module';
import { ThrottlerModule } from '@modules/throttler.module';
import { Logger, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ChatModule } from '@websocket/chat/chat.module';
import { existsSync, mkdirSync } from 'fs';

@Module({
  imports: [
    QueueModule,
    ChatModule,
    ConfigModule,
    DatabaseModule,
    BullModule,
    ThrottlerModule,
    SeedModule,
    AuthModule,
    VoteModule,
    UserAnimeListModule,
    UserModule,
    AnimeModule,
    ReviewModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppModule.name);

  async onApplicationBootstrap() {
    try {
      if (!existsSync('.temp')) {
        mkdirSync('.temp');
      }
      if (!existsSync('public')) {
        mkdirSync('public');
        mkdirSync('public/anime/cover', { recursive: true });
        mkdirSync('public/user/avatar', { recursive: true });
      }
    } catch (error) {
      this.logger.error('Error when creating files directories', error.message);
    }
  }
}
