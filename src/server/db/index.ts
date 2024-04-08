import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { baseCompanies } from '@/server/db/schema';

/**
 * Cache the Neon database connection in development. This avoids creating a new connection on every HMR update.
 */
const globalForDb = globalThis as unknown as {
  conn: ReturnType<typeof neon> | undefined;
};

const sql = globalForDb.conn ?? neon(process.env.DATABASE_URL!); // Accessing DATABASE_URL from env
if (process.env.NODE_ENV !== "production") globalForDb.conn = sql;

const db = drizzle(sql);

const allCompanies = await db.select().from(baseCompanies);

console.log(allCompanies);

