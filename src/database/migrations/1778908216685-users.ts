import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { ROLES, SOCIAL_LOGIN_TYPE } from '../../constants/key.constants';

export class users1778908216685 implements MigrationInterface {
  private table = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      { name: 'name', type: 'varchar', length: '150', isNullable: false },
      { name: 'email', type: 'varchar', length: '100', isNullable: false },
      { name: 'countryCode', type: 'varchar', isNullable: false },
      { name: 'phone', type: 'varchar', isNullable: false },
      { name: 'password', type: 'varchar', length: '150', isNullable: false },
      {
        name: 'role',
        type: 'enum',
        enum: [ROLES.ADMIN, ROLES.USER],
        default: `'${ROLES.USER}'`,
      },
      {
        name: 'socialLoginType',
        type: 'enum',
        enum: [
          SOCIAL_LOGIN_TYPE.EMAIL,
          SOCIAL_LOGIN_TYPE.GOOGLE,
          SOCIAL_LOGIN_TYPE.APPLE,
        ],
        default: `'${SOCIAL_LOGIN_TYPE.EMAIL}'`,
      },
      {
        name: 'googleId',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'appleId',
        type: 'varchar',
        isNullable: true,
      },
      { name: 'isActive', type: 'boolean', default: true },
      { name: 'createdAt', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
      {
        name: 'updatedAt',
        type: 'timestamptz',
        default: 'CURRENT_TIMESTAMP',
        isNullable: true,
      },
      {
        name: 'deletedAt',
        type: 'timestamptz',
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
