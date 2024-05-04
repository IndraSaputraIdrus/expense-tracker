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

  // method post dengan zod validator middleware
  .post("/", zValidator("json", createExpenseSchema), (c) => {
    const expense = c.req.valid("json")
    fakeExpense.push({ ...expense, id: fakeExpense.length + 1 })
    c.status(201)
    return c.json({ expense })
  })

  // pastikan parameter nya harus angka
  .get("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const expense = fakeExpense.find(expense => expense.id === id)

    if (!expense) {
      return c.notFound()
    }

    return c.json({ expense })
  })

  // delete method
  .delete("/:id{[0-9]+}", (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const index = fakeExpense.findIndex(expense => expense.id === id)

    if (index === -1) {
      return c.notFound()
    }

    const deletedExpense = fakeExpense.splice(index, 1)[0]

    return c.json({ expense: deletedExpense })
  })
