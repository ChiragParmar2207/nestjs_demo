import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class otps1778907935273 implements MigrationInterface {
  private table = new Table({
    name: 'otps',
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        default: `uuid_generate_v4()`,
      },
      { name: 'email', type: 'varchar', length: '100', isNullable: false },
      { name: 'otp', type: 'varchar', length: '6', isNullable: false },
      { name: 'createdAt', type: 'timestamptz', default: 'CURRENT_TIMESTAMP' },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.table);
  }
}
