import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { baseCompanies } from './db/schema';
import { elaborateCompanies } from './db/schema';
import { config } from 'dotenv';
import { genPageJsonb } from './db/schema';
import { GenPageType } from './db/schema';

config ({
    path: '.env',
});

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);

const db = drizzle(sql);

const allCompanies = await db.select().from(baseCompanies);

console.log(allCompanies);

const data = await db.select({
    field: sql`${elaborateCompanies.genpage}->>'summary'`, // Using ->> to access JSONB field as text
  })
  .from(elaborateCompanies).execute();

console.log(data);



  
