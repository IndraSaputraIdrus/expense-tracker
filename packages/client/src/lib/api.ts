import { hc } from "hono/client"
import type { ApiRoutes } from "server/src/app"
import { queryOptions } from "@tanstack/react-query"

const client = hc<ApiRoutes>('/')
export const api = client.api


async function getCurrentUser() {
  const res = await api.me.$get()
  if (!res.ok) {
    throw new Error("Server error")
  }
  return res.json()
}

export const userQueryOptions = queryOptions({
  queryKey: ["get-current-user"],
  queryFn: getCurrentUser,
  staleTime: Infinity
})
