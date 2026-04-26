import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { ROLES } from '../../constants/key.constants';

export class Users1777183983052 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'userId',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      {
        name: 'name',
        type: 'varchar',
        length: '150',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar',
        length: '150',
        isNullable: false,
      },
      {
        name: 'countryCode',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'phone',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'password',
        type: 'varchar',
        length: '150',
        isNullable: true,
      },
      {
        name: 'role',
        type: 'enum',
        enum: [ROLES.ADMIN, ROLES.USER],
        default: `'${ROLES.USER}'`,
      },
      {
        name: 'isActive',
        type: 'boolean',
        default: true,
      },
      {
        name: 'createdAt',
        type: 'varchar',
        length: '10',
      },
      {
        name: 'updatedAt',
        type: 'varchar',
        length: '10',
        isNullable: true,
      },
      {
        name: 'deletedAt',
        type: 'varchar',
        length: '10',
        isNullable: true,
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
