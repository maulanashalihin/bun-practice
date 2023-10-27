import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
    id: text("id").primaryKey(),
    username: text("username").unique(),
    pin: text("pin"),
    loginAt: text("login_at"),
    createdAt: text("created_at"),
    updatedAt: text("updated_at"),
});

