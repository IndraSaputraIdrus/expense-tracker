import { createFileRoute } from '@tanstack/react-router'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

import { api } from '@/lib/api'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/_authenticated/expenses')({
  component: ExpensesPage,
})

async function getAllExpenses() {
  const res = await api.expense.$get()
  if (!res.ok) {
    throw new Error("Server error")
  }
  return res.json()
}

function ExpensesPage() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get-all-expenses"],
    queryFn: getAllExpenses
  })

  if (error) return `An error has occurred: ${error.message}`

  return (
    <main className="space-y-5">
      <h1 className="text-4xl font-semibold">List All Expenses</h1>

      <div className="border rounded pb-4">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ?
              Array(3).fill(null).map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4" />
                  </TableCell>
                </TableRow>
              )) :
              data?.expense.map(expense => (
                <TableRow key={expense.id}>
                  <TableCell className="font-medium">{expense.id}</TableCell>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell className="text-right">{expense.amount}</TableCell>
                </TableRow>
              ))
            }


          </TableBody>
        </Table>
      </div>
    </main>
  )
}
