import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator";
import { z } from "zod"
import { getUser } from "../lib/kinde";
import { db } from "../lib/db"
import { and, eq, desc, sum } from "drizzle-orm";
import { expenseTable } from "../lib/db/schema/expense";

const expenseSchema = z.object({
  id: z.number(),
  title: z.string().min(3).max(100),
  amount: z.number().int().positive()
})

const createExpenseSchema = expenseSchema.omit({ id: true })

export const expenseRoutes = new Hono()
  .get("/", getUser, async (c) => {
    const user = c.var.user
    const expenses = db
      .select()
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .orderBy(desc(expenseTable.createdAt))
      .all()

    return c.json({ expenses })
  })

  .get('/total-spent', getUser, (c) => {
    const user = c.var.user

    const total = db
      .select({
        total: sum(expenseTable.amount)
      })
      .from(expenseTable)
      .where(eq(expenseTable.userId, user.id))
      .get()

    return c.json(total)
  })

  // method post dengan zod validator middleware
  .post("/", getUser, zValidator("json", createExpenseSchema), async (c) => {
    const expense = c.req.valid("json")
    const user = c.var.user

    const result = db
      .insert(expenseTable)
      .values({
        ...expense,
        userId: user.id
      })
      .returning()
      .get()


    c.status(201)
    return c.json({ expense: result })

  })

  // pastikan parameter nya harus angka
  .get("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const expense = db
      .select()
      .from(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .get()

    if (!expense) {
      return c.notFound()
    }

    return c.json({ expense })
  })

  // delete method
  .delete("/:id{[0-9]+}", getUser, (c) => {
    const id = Number.parseInt(c.req.param("id"))
    const user = c.var.user

    const expense = db
      .delete(expenseTable)
      .where(and(eq(expenseTable.userId, user.id), eq(expenseTable.id, id)))
      .returning()
      .get()

    if (expense) {
      return c.notFound()
    }
    return c.json({ expense })
  })
