import { Button } from "@/components/ui/button"
import { userQueryOptions } from "@/lib/api"
import { Outlet, createFileRoute } from "@tanstack/react-router"

// src/routes/_authenticated.tsx
export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ context }) => {
    // check if user is logged in
    try {
      const queryClient = context.queryClient
      const data = await queryClient.fetchQuery(userQueryOptions)
      return data
    } catch (error) {
      return { user: null }

    }
  },
  component: AuthPage
})

function AuthPage() {
  const { user } = Route.useRouteContext()
  if (!user) {
    return (
      <div>
        <h1 className="text-4xl mb-4 font-semibold">You have to login</h1>
        <Button asChild>
          <a href="/api/login">Login</a>
        </Button>
      </div>
    )
  }
  return <Outlet />

}
