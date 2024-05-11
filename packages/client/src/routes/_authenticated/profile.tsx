import { createFileRoute } from '@tanstack/react-router'
import { userQueryOptions } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/_authenticated/profile')({
  component: ProfilePage
})


function ProfilePage() {
  const { data, isLoading, error } = useQuery(userQueryOptions)

  if (isLoading) return (
    <div className="flex justify-center items-center py-10">
      <Loader2 className="animate-spin" />
    </div>
  )

  if (error) return `An error has occurred: ${error.message}`

  return (
    <main>
      <h1 className="text-4xl mb-5 font-semibold">
        Profile
      </h1>
      <p>Hello <span className="text-indigo-500">{data?.user.given_name} {data?.user.family_name}</span></p>
      <Button className="mt-4" asChild>
        <a href="/api/logout">Logout</a>
      </Button>
    </main>
  )

}
