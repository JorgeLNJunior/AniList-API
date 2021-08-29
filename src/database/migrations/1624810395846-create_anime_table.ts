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
            length: '1000',
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
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('anime', true);
  }
}
