import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";

const app = new Hono()

app.use(logger())

app.get("/", c => {
  return c.json({
    message: "hello world"
  })
})

app.route("/api/expense", expenseRoute)

export default app
