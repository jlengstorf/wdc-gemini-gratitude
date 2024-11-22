import { defineConfig } from 'drizzle-kit';
import { DATABASE_URL } from 'astro:env/server';

export default defineConfig({
	schema: './src/db/schema.ts',
	out: './srcm/db/migrations',
	dialect: 'postgresql',
	dbCredentials: {
		url: DATABASE_URL,
	},
});
