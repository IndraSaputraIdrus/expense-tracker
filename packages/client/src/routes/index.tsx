import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index
})

function Index() {
  return (
    <div>
      <h1 className="text-4xl mb-5 font-semibold">
        Welcome to expense tracker
      </h1>
      <p>
        check list <Link className="text-indigo-500 hover:opacity-60" to="/expense">expense</Link>
      </p>
    </div>
  )

}
