import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { notesTable } from '../db/schema';
import { db } from '../db/client';
import { sendEmail } from '../email/client';

export const server = {
	notes: {
		create: defineAction({
			accept: 'form',
			input: z.object({
				sender: z.string(),
				recipient: z.string().email(),
				subject: z.string(),
				body: z.string(),
				publicPost: z.boolean(),
			}),
			handler: async ({ sender, recipient, subject, body, publicPost }) => {
				const emailRes = await sendEmail({
					sender,
					recipient,
					subject,
					body,
				});

				let publicNote = false;
				if (publicPost) {
					const dbRes = await db
						.insert(notesTable)
						.values({ sender, recipient, subject, body });

					publicNote = dbRes.rowCount > 0;
				}

				return {
					emailSent: !!emailRes.id,
					publicNote,
				};
			},
		}),
	},
};
