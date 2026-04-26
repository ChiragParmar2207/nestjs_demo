import AppDataSource from '../data-source';

/**
 * Main Seeder Runner
 *
 * Usage: npm run seed
 *
 * Add your seed functions to the `seeders` array below.
 * Each seed function receives the initialized DataSource.
 *
 * Example:
 *   import { seedUsers } from './user.seed.js';
 *   const seeders = [seedUsers];
 */

// Import individual seed functions here
// import { seedUsers } from './user.seed.js';

// Register all seed functions in execution order
const seeders: Array<(dataSource: typeof AppDataSource) => Promise<void>> = [
  // seedUsers,
];

async function runSeeders(): Promise<void> {
  console.log('Initializing DataSource...');
  await AppDataSource.initialize();
  console.log('DataSource initialized.\n');

  for (const seeder of seeders) {
    const name = seeder.name || 'anonymous';
    console.log(`Running seeder: ${name}`);
    await seeder(AppDataSource);
    console.log(`Seeder complete: ${name}\n`);
  }

  console.log('All seeders finished successfully.');
  await AppDataSource.destroy();
}

runSeeders().catch((error) => {
  console.error('Seeder failed:', error);
  process.exit(1);
});
