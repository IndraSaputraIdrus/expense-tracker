import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator";
import { z } from "zod"

type Expense = {
  id: number;
  title: string;
  amount: number;
}

const fakeExpense: Array<Expense> = [
  { id: 1, title: "Groceries", amount: 50 },
  { id: 2, title: "Utilities", amount: 100 },
  { id: 3, title: "rent", amount: 1000 },
]

const createExpenseSchema = z.object({
  title: z.string().min(3).max(100),
  amount: z.number().int().positive()
})

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expense: fakeExpense })
  })
  .post("/", zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json")
    fakeExpense.push({ ...expense, id: fakeExpense.length + 1 })
    return c.json({ expense })
  })
