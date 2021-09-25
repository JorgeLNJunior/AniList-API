import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class createVoteTable1632599516442 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'vote',
      columns: [
        {
          name: 'uuid',
          type: 'varchar',
          length: '36',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'userUuid',
          type: 'varchar',
          length: '36'
        },
        {
          name: 'reviewUuid',
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
    }), true)

    await queryRunner.createForeignKeys('vote', [
      new TableForeignKey({
        columnNames: ['userUuid'],
        referencedTableName: 'user',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['reviewUuid'],
        referencedTableName: 'review',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      })
    ])
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('vote', true)
  }
}
