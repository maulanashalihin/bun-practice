CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`user_agent` text,
	`created_at` text,
	`updated_at` text
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `sessions` (`user_id`);