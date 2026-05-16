import AppDataSource from '../data-source';
import { seedAdmin } from './admin.seed';

// Register all seed functions in execution order
const seeders: Array<(dataSource: typeof AppDataSource) => Promise<void>> = [
  seedAdmin,
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
