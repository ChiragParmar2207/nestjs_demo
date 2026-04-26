import * as dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';

dotenv.config();

/**
 * Shared TypeORM configuration.
 * Used by both the NestJS DatabaseModule and the standalone DataSource (CLI migrations).
 * This is the single source of truth for all DB connection settings.
 */
export function getTypeOrmConfig(): DataSourceOptions {
  return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nest_demo',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    synchronize: false, // Always false - use migrations instead
    logging: process.env.DB_LOGGING === 'true',
  };
}
