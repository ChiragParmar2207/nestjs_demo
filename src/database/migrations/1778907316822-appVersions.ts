import { MigrationInterface, QueryRunner, Table } from 'typeorm';

import { DEVICE_TYPES } from '../../constants/key.constants';

export class appVersions1778907316822 implements MigrationInterface {
  private table = new Table({
    name: 'appVersions',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      {
        name: 'deviceType',
        type: 'enum',
        enumName: 'appVersions_deviceType_enum',
        enum: [DEVICE_TYPES.ANDROID, DEVICE_TYPES.IOS],
        isUnique: true,
        isNullable: false,
      },
      { name: 'versionCode', type: 'varchar', length: '10', isNullable: false },
      { name: 'createdAt', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
