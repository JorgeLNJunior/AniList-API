import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class createUserListTable1649598264109 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'user_list',
      columns: [
        {
          name: 'uuid',
          type: 'varchar',
          length: '36',
          isPrimary: true,
          generationStrategy: 'uuid'
        },
        {
          name: 'status',
          type: 'varchar',
          isNullable: false
        },
        {
          name: 'userUuid',
          type: 'varchar',
          length: '36',
        },
        {
          name: 'animeUuid',
          type: 'varchar',
          length: '36',
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

    await queryRunner.createForeignKeys('user_list', [
      new TableForeignKey({
        columnNames: ['userUuid'],
        referencedTableName: 'user',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
      new TableForeignKey({
        columnNames: ['animeUuid'],
        referencedTableName: 'anime',
        referencedColumnNames: ['uuid'],
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.dropTable('user_list', true)
  }

}
