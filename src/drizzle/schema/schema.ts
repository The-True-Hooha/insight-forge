import { relations, sql } from 'drizzle-orm';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const userEntity = sqliteTable('Users', {
  userId: text('userId', { mode: 'text' }).primaryKey(),
  name: text('name').unique(),
  email: text('email', { mode: 'text' }).primaryKey().unique(),
  password: text('password', { mode: 'text' }),
  role: text('role', { enum: ['admin', 'manager', 'member', 'owner'] }).default(
    'owner',
  ),
  gender: text('gender', {enum: ["male", "female", "non_binary"]}),
  username: text('username', {mode: 'text'}).unique(),
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
  teamId: text('teamId'),
});

export const teamEntity = sqliteTable('Team', {
  teamId: text('teamId', { mode: 'text' }).primaryKey(),
  teamName: text('teamName', { mode: 'text' }).primaryKey().unique(),
  teamSize: integer('teamSize', { mode: 'number' }),
  createdAt: text('createdAt').default(sql`CURRENT_TIMESTAMP`),
});

export const userTeamRelations = relations(userEntity, ({ one }) => ({
  teamEntity: one(teamEntity, {
    fields: [userEntity.teamId],
    references: [teamEntity.teamId]
  })
}))

