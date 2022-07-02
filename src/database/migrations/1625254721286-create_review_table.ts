import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey
} from 'typeorm'

export class createReviewTable1625254721286 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'review',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            length: '36',
            isPrimary: true,
            generationStrategy: 'uuid'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'description',
            type: 'varchar',
            length: '1000'
          },
          {
            name: 'rating',
            type: 'integer'
          },
          {
            name: 'animeUUID',
            type: 'varchar',
            length: '36'
          },
          {
            name: 'userUUID',
            type: 'varchar',
            length: '36'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
            default: null,
            onUpdate: 'CURRENT_TIMESTAMP'
          },
          {
            name: 'deletedAt',
            type: 'timestamp',
            isNullable: true
          }
        ]
      }),
      true
    )
    await queryRunner.createForeignKeys('review', [
      new TableForeignKey({
        columnNames: ['animeUUID'],
        referencedTableName: 'anime',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['userUUID'],
        referencedTableName: 'user',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('review', true)
  }
}
