import CreateExpenseForm from '@/components/CreateExpenseForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create')({
  component: CreateExpensePage
})

function CreateExpensePage() {
  return (
    <main className="max-w-md mx-auto">
      <h1 className="text-4xl font-semibold mb-7">Create Expense Page</h1>

      <CreateExpenseForm />
    </main>
  )
}
