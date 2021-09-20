import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class createUserTable1624386610633 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'uuid',
            type: 'varchar',
            generationStrategy: 'uuid',
            isPrimary: true,
            length: '36'
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false
          },
          {
            name: 'avatar',
            type: 'varchar',
            isNullable: true,
            default: "'http://localhost:3000/user/avatar/default.jpg'"
          },
          {
            name: 'isAdmin',
            type: 'boolean',
            default: false
          },
          {
            name: 'isEmailConfirmed',
            type: 'boolean',
            default: false
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
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user', true)
  }
}
