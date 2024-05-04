import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"

const App = () => {

  const [totalSpent, setTotalSpent] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getTotal() {
      const res = await fetch("/api/expense/total-spent")
      const data = await res.json()
      setLoading(false)
      setTotalSpent(data.total)
    }

    getTotal()
  })

  return (
    <main className="max-w-2xl mx-auto px-3 py-5">
      <Card>
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? "loading..." : totalSpent}
        </CardContent>
      </Card>
    </main>
  )
}

export default App
