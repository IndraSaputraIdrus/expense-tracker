import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useForm } from "@tanstack/react-form"
import { api } from "@/lib/api"
import { useNavigate } from "@tanstack/react-router"


export default function CreateExpenseForm() {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({
        json: value
      })
      if (!res.ok) {
        throw new Error("server error")
      }
      navigate({ to: "/expenses" })
    }
  })

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      e.stopPropagation()
      form.handleSubmit()
    }} className="flex flex-col gap-2">

      <form.Field
        name="title"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} >Title</Label>
            <Input
              id={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {field.state.meta.touchedErrors ? (
              <em>{field.state.meta.touchedErrors}</em>
            ) : null}
          </div>
        )}
      />

      <form.Field
        name="amount"
        children={(field) => (
          <div className="space-y-1.5">
            <Label htmlFor={field.name} >Amount</Label>
            <Input
              id={field.name}
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(Number(e.target.value))}
            />
            {field.state.meta.touchedErrors ? (
              <em>{field.state.meta.touchedErrors}</em>
            ) : null}
          </div>
        )}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <Button disabled={!canSubmit} type="submit" className="mt-1.5">{isSubmitting ? "..." : "Submit"}</Button>
        )}
      />

    </form>
  )
}
