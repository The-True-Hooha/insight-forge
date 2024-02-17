CREATE TABLE `Team` (
	`teamId` text PRIMARY KEY NOT NULL,
	`teamName` text PRIMARY KEY NOT NULL,
	`teamSize` integer,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`userId` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text PRIMARY KEY NOT NULL,
	`password` text,
	`role` text DEFAULT 'owner',
	`gender` text,
	`username` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP,
	`teamId` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Team_teamName_unique` ON `Team` (`teamName`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_name_unique` ON `Users` (`name`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_email_unique` ON `Users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `Users_username_unique` ON `Users` (`username`);