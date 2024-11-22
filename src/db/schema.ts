import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const notesTable = pgTable('notes', {
	id: serial('id').primaryKey(),
	sender: text('sender').notNull(),
	recipient: text('recipient').notNull(),
	subject: text('subject').notNull(),
	body: text('body').notNull(),
});

export type InsertNote = typeof notesTable.$inferInsert;
export type SelectNote = typeof notesTable.$inferSelect;
