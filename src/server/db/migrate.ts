import {migrate} from 'drizzle-orm/neon-http/migrator';
import {config} from 'dotenv';
import { db } from '@/server/index';

const main = async () => {
    try {
        await migrate(db, {
            migrationsFolder: 'drizzle',
        });
        console.log('Migration successful');
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

await main();