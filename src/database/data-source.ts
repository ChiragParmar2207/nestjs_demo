import { DataSource } from 'typeorm';

import { getTypeOrmConfig } from './typeorm.config';

/**
 * Standalone DataSource instance for TypeORM CLI.
 *
 * Used by migration commands:
 *   npm run migration:generate --name=CreateUsersTable
 *   npm run migration:run
 *   npm run migration:revert
 *
 * This file is NOT imported by the NestJS app at runtime —
 * it exists solely for the TypeORM CLI to discover the DataSource.
 */
const AppDataSource = new DataSource(getTypeOrmConfig());

export default AppDataSource;
