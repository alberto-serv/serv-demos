"use client"

import { motion } from "framer-motion"
import { Clock, MousePointerClick, TrendingUp } from "lucide-react"
import { GradientText } from "@/components/AnimatedGradient"

const EASE = [0.16, 1, 0.3, 1] as const

const beats = [
  {
    icon: Clock,
    kicker: "The problem",
    title: "Quotes die in the gap.",
    body: "A customer is ready to buy at 9pm. The trucks are out, the office is closed, and the lead goes cold waiting for a callback. Home services has always sold on someone else's schedule.",
  },
  {
    icon: MousePointerClick,
    kicker: "The product",
    title: "A storefront that never sleeps.",
    body: "SERV turns a service business into an online checkout. Customers configure, price, and book in minutes — no truck roll to quote, no phone tag. The sale closes itself.",
  },
  {
    icon: TrendingUp,
    kicker: "The proof",
    title: "Real revenue, every trade.",
    body: "From closets to generators to pet-waste routes, operators are live and selling. Each storefront below is a business that put its sales on autopilot — and the case studies show the lift.",
  },
]

export function Story() {
  return (
    <section id="story" className="relative py-24 md:py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Why this matters
          </p>
          <h2 className="mt-4 font-heading text-4xl md:text-5xl font-bold tracking-tighter leading-[0.95]">
            The same story, <GradientText>every trade.</GradientText>
          </h2>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {beats.map((beat, i) => (
            <motion.div
              key={beat.kicker}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: EASE }}
              className="group relative rounded-sm border border-border bg-card p-8"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-primary via-secondary to-tertiary transition-transform duration-500 group-hover:scale-x-100" />
              <div className="flex size-12 items-center justify-center rounded-sm bg-gradient-to-br from-primary via-secondary to-tertiary text-background">
                <beat.icon className="size-5" />
              </div>
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {beat.kicker}
              </p>
              <h3 className="mt-2 font-heading text-2xl font-bold tracking-tight text-foreground">
                {beat.title}
              </h3>
              <p className="mt-3 text-base font-light leading-relaxed text-muted-foreground">
                {beat.body}
              </p>
              <div className="mt-6 font-heading text-5xl font-bold text-muted/60 tabular-nums">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
