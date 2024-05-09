import { Hono } from "hono";
import { logger } from "hono/logger";
import { expenseRoute } from "./routes/expenses";
import { serveStatic } from "hono/bun";

const app = new Hono()

app.use(logger())

const apiRoute = app.basePath("/api")
  .route("/expense", expenseRoute)

if (process.env.NODE_ENV === "production") {
  app.get('*', serveStatic({ root: './public' }))
  app.get('*', serveStatic({ path: './public/index.html' }))
}

export default app
export type ApiRoutes = typeof apiRoute
