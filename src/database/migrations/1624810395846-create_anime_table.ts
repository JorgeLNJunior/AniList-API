import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAnimeTable1624810395846 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'anime',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            length: '36',
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'synopsis',
            type: 'varchar',
            length: '2000',
            isNullable: false,
          },
          {
            name: 'cover',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'trailer',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'episodes',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'releaseDate',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'season',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'genre',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
            onUpdate: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('anime', true);
  }
}
