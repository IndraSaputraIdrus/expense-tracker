import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create')({
  component: CreateExpensePage
})

function CreateExpensePage() {
  return (
    <main>
      <h1>Create Expense Page</h1>
    </main>
  )
}
