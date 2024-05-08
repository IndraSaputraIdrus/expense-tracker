import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono()

app.use(logger())

app.route("/api/expense", expenseRoute)

app.get('*', serveStatic({ root: './client/dist' }))
app.get('*', serveStatic({ path: './client/dist/index.html' }))

export default app
