"use client"

import { Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft } from "lucide-react"

const CLASS =
  "mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"

/**
 * Detail pages are reachable from both cuts of the showcase, so the back link
 * has to follow whichever one sent the visitor here — `/` is password-gated,
 * and bouncing a customer there from the open `/customers` cut dead-ends them
 * on the login screen.
 */
function BackLink() {
  const from = useSearchParams().get("from")
  const href = from === "customers" ? "/customers#showcase" : "/#showcase"

  return (
    <Link href={href} className={CLASS}>
      <ArrowLeft className="size-4" />
      Back to showcase
    </Link>
  )
}

export function BackToShowcase() {
  return (
    // Reading the query string client-side keeps the detail pages static; the
    // fallback renders the same link, just pointing at the default showcase.
    <Suspense
      fallback={
        <span className={CLASS}>
          <ArrowLeft className="size-4" />
          Back to showcase
        </span>
      }
    >
      <BackLink />
    </Suspense>
  )
}
