import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createReviewTable1625254721286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review',
        foreignKeys: [
          {
            name: 'animeUuid',
            columnNames: ['animeUuid'],
            referencedTableName: 'anime',
            referencedColumnNames: ['uuid'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
          {
            name: 'userUuid',
            columnNames: ['userUuid'],
            referencedTableName: 'user',
            referencedColumnNames: ['uuid'],
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000',
          },
          {
            name: 'rating',
            type: 'integer',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review', true);
  }
}
