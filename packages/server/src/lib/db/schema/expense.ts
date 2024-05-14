import { sql } from "drizzle-orm";
import { sqliteTable, text, integer, index } from "drizzle-orm/sqlite-core";

export const expenseTable = sqliteTable("expenses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  amount: integer("amount").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`)
},
  (expenses) => {
    return {
      userIdIndex: index("user_id_idx").on(expenses.userId)
    }
  }
)
