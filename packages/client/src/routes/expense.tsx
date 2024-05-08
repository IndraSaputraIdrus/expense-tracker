import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const Route = createFileRoute('/expense')({
  component: ExpensePage,
})

async function getTotalSpent() {
  const res = await api.expense['total-spent'].$get()
  if (!res.ok) {
    throw new Error("Server error")
  }
  return res.json()
}

function ExpensePage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent
  })

  if (error) return `An error has occurred: ${error.message}`

  return (
    <main>
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? "loading..." : data?.total}
        </CardContent>
      </Card>
    </main>
  )
}
