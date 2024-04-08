import {neon} from '@neondatabase/serverless';
import {drizzle} from 'drizzle-orm/neon-http';
import {baseCompanies} from './db/schema';
import {config} from 'dotenv';

config ({
    path: '.env',
});

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);

const db = drizzle(sql);

const allCompanies = await db.select().from(baseCompanies);

console.log(allCompanies);