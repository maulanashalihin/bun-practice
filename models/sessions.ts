import { index, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
    id: text("id").primaryKey(),
    user_id: text("user_id"),   
    user_agent : text("user_agent"),  
    createdAt: text("created_at"), 
    updatedAt: text("updated_at")
  }, (table) => {
    return {
      userIdx: index("user_idx").on(table.user_id)
    };
  });