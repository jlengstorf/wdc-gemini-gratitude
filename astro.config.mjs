// @ts-check
import { defineConfig, envField } from 'astro/config';
import clerk from '@clerk/astro';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
	integrations: [clerk()],
	output: 'server',

	env: {
		schema: {
			DATABASE_URL: envField.string({
				context: 'server',
				access: 'secret',
			}),
			PUBLIC_CLERK_PUBLISHABLE_KEY: envField.string({
				context: 'client',
				access: 'public',
			}),
			CLERK_SECRET_KEY: envField.string({
				context: 'server',
				access: 'secret',
			}),
			RESEND_API_KEY: envField.string({
				context: 'server',
				access: 'secret',
			}),
		},
	},

	adapter: netlify(),
});
