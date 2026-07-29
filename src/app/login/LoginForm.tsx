"use client"

import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { ArrowRight, Lock } from "lucide-react"
import { login, type LoginState } from "./actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-11 w-full items-center justify-center gap-1.5 rounded-sm bg-foreground text-sm font-semibold text-background transition-colors hover:bg-primary disabled:opacity-60"
    >
      {pending ? "Checking…" : "Enter"}
      <ArrowRight className="size-4" />
    </button>
  )
}

export function LoginForm({ next }: { next?: string }) {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {})

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {next && <input type="hidden" name="next" value={next} />}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="password" className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            id="password"
            name="password"
            type="password"
            autoFocus
            autoComplete="current-password"
            aria-invalid={Boolean(state.error)}
            className="h-11 w-full rounded-sm border border-input bg-background pl-9 pr-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary aria-[invalid=true]:border-secondary"
            placeholder="Enter the password"
          />
        </div>
      </div>

      <SubmitButton />

      <p aria-live="polite" className="min-h-[1.25rem] text-sm text-secondary">
        {state.error}
      </p>
    </form>
  )
}
