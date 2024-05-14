import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from './lib/db';

// This will run migrations on the database, skipping the ones already applied
migrate(db, { migrationsFolder: './drizzle' });
console.log("Migration Complete")

