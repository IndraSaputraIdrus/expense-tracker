import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function CreateExpenseForm() {
  function handleSubmit() { }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="space-y-1.5">
        <Label htmlFor="title">Title</Label>
        <Input id="title" type="text" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" />
      </div>
      <Button className="mt-1.5">Submit</Button>
    </form>
  )
}
