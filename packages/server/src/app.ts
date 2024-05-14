import { Hono } from "hono";
import { logger } from "hono/logger";
import { serveStatic } from "hono/bun";

import { expenseRoutes } from "./routes/expenses";
import { authRoutes } from "./routes/auth";

const app = new Hono()

app.use(logger())

const apiRoute = app.basePath("/api")
  .route("/expenses", expenseRoutes)
  .route("/", authRoutes)

if (process.env.NODE_ENV === "production") {
  app.get('*', serveStatic({ root: './public' }))
  app.get('*', serveStatic({ path: './public/index.html' }))
}

export default app
export type ApiRoutes = typeof apiRoute
