"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"
import { GradientText } from "@/components/AnimatedGradient"

const EASE = [0.16, 1, 0.3, 1] as const

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden pt-12 pb-10 md:pt-14 md:pb-12">
      {/* drifting brand gradient — richer than the ambient wash so it reads as SERV */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/20 to-tertiary/30 animate-gradient-xy" />
      {/* saturated brand orbs for depth */}
      <div className="absolute -top-32 -right-24 h-[42rem] w-[42rem] rounded-full bg-primary/30 blur-[130px]" />
      <div className="absolute -bottom-40 left-1/4 h-[34rem] w-[34rem] rounded-full bg-secondary/25 blur-[130px]" />
      {/* fade the wash into the page so the section below stays clean */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 rounded-sm border border-border bg-background/70 px-3 py-1 backdrop-blur-md text-sm text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            The SERV Showcase
          </div>

          <h1 className="mt-4 font-heading font-bold tracking-tighter text-foreground text-4xl md:text-5xl lg:text-6xl leading-[0.95]">
            Home services, sold <GradientText>online 24/7.</GradientText>
          </h1>

          <p className="mt-4 max-w-2xl text-base md:text-lg font-light text-muted-foreground leading-relaxed tracking-tight">
            Every business below traded the &ldquo;we&rsquo;ll call you back&rdquo; quote for a
            storefront that closes jobs while the trucks are out. This is the proof — live, in
            development, and demoed across the trades.
          </p>

          <div className="mt-6">
            <a href="#showcase">
              <button className="inline-flex items-center gap-2 rounded-sm bg-foreground px-7 h-12 text-base font-semibold text-background transition-all hover:bg-foreground/90">
                Explore the storefronts
                <ArrowDown className="size-4" />
              </button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
