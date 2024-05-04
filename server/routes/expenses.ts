import { Hono } from "hono"

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

export const expenseRoute = new Hono()
  .get("/", (c) => {
    return c.json({ expense: fakeExpense })
  })
  .post("/", async (c) => {
    const data = await c.req.json()
    console.log(data)
    return c.json({ expense: data })
  })
