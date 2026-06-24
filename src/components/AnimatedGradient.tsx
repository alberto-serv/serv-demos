"use client"

import { cn } from "@/lib/utils"

/**
 * SERV signature animated gradient — the drifting purple → coral → amber wash.
 * Drop it as the first child of a `relative overflow-hidden` container; it fills
 * the parent (`absolute inset-0`). Put real content in a sibling with `relative z-10`.
 *
 * Variants:
 *  - "cta"     full-strength wash behind a frosted card (default, opacity-80)
 *  - "ambient" quiet tinted backdrop for heroes (low-opacity stops)
 *
 * Set `animate={false}` for a static frame (e.g. the 1px media border treatment).
 */
export function AnimatedGradient({
  variant = "cta",
  animate = true,
  className,
}: {
  variant?: "cta" | "ambient"
  animate?: boolean
  className?: string
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "absolute inset-0 bg-gradient-to-br",
        variant === "cta"
          ? "from-primary via-secondary to-tertiary opacity-80"
          : "from-primary/5 via-secondary/5 to-tertiary/5 opacity-50",
        animate && "animate-gradient-xy",
        className,
      )}
    />
  )
}

/**
 * Full CTA section: drifting gradient behind a floating frosted card.
 * Mirrors the production `CTASection` on goserv.com.
 */
export function GradientCTASection({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 relative overflow-hidden">
      <AnimatedGradient variant="cta" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="bg-background/95 backdrop-blur-sm shadow-2xl rounded-sm p-10 md:p-16 max-w-4xl mx-auto flex flex-col items-center gap-6 border border-white/20">
          {children}
        </div>
      </div>
    </section>
  )
}

/** Inline gradient text for an emphasized headline word. */
export function GradientText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent", className)}>
      {children}
    </span>
  )
}
