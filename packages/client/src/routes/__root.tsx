import { createRootRoute, Link, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: Root
})

function Root() {
  return (
    <>
      <div className="p-5 flex gap-2">
        <Link to="/" className={"[&.active]:font-bold"}>
          Home
        </Link>
        <Link to="/expenses" className={"[&.active]:font-bold"}>
          Expenses
        </Link>
        <Link to="/create" className={"[&.active]:font-bold"}>
          Create
        </Link>
        <Link to="/about" className={"[&.active]:font-bold"}>
          About
        </Link>
      </div>
      <hr />
      <div className="max-w-2xl mx-auto px-3 py-5">
        <Outlet />
      </div>
    </>
  )
}
