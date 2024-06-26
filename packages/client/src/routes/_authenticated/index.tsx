import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createFileRoute('/_authenticated/')({
  component: Index
})
import { api } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

async function getTotalSpent() {
  const res = await api.expenses['total-spent'].$get()
  if (!res.ok) {
    throw new Error("Server error")
  }
  return res.json()
}

function Index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent
  })

  if (error) return `An error has occurred: ${error.message}`
  return (
    <main>
      <h1 className="text-4xl mb-5 font-semibold">
        Welcome to expense tracker
      </h1>
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
