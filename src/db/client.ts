import { DATABASE_URL } from 'astro:env/server';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

const sql = neon(DATABASE_URL);
export const db = drizzle(sql);
