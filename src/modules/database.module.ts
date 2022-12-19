import { createUserTable1624386610633 } from '@database/migrations/1624386610633-create_user_table'
import { createAnimeTable1624810395846 } from '@database/migrations/1624810395846-create_anime_table'
import { createReviewTable1625254721286 } from '@database/migrations/1625254721286-create_review_table'
import { createVoteTable1632599516442 } from '@database/migrations/1632599516442-create_vote_table'
import { createUserAnimeListTable1649598264109 } from '@database/migrations/1649598264109-create_user_anime_list_table'
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<any>('DB_TYPE'),
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USER'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        synchronize: configService.get<boolean>('DB_SYNCHRONIZE'),
        autoLoadEntities: true,
        migrations: [
          createUserTable1624386610633,
          createAnimeTable1624810395846,
          createReviewTable1625254721286,
          createVoteTable1632599516442,
          createUserAnimeListTable1649598264109
        ],
        migrationsRun: configService.get<boolean>('DB_MIGRATE')
      })
    })
  ]
})
export class DatabaseModule {}
