import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: Root
})

function Root() {
  return (
    <>
      <div className="p-5 flex gap-2">
        <Link to="/" className={"[&.active]:font-bold [&.active]:text-indigo-400"}>
          Home
        </Link>
        <Link to="/expenses" className={"[&.active]:font-bold [&.active]:text-indigo-400"}>
          Expenses
        </Link>
        <Link to="/create" className={"[&.active]:font-bold [&.active]:text-indigo-400"}>
          Create
        </Link>
        <Link to="/profile" className={"[&.active]:font-bold [&.active]:text-indigo-400"}>
          Profile
        </Link>
        <Link to="/about" className={"[&.active]:font-bold [&.active]:text-indigo-400"}>
          About
        </Link>
      </div>
      <hr />
      <div className="max-w-2xl mx-auto px-3 py-10">
        <Outlet />
      </div>
    </>
  )
}
