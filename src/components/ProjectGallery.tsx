"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { ProjectShot } from "@/data/projects"

const EASE = [0.16, 1, 0.3, 1] as const

const AUTOPLAY_MS = 5000

export function ProjectGallery({ shots, alt }: { shots: ProjectShot[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = shots.length

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + count) % count),
    [count],
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1)
      if (e.key === "ArrowLeft") go(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  // auto-advance — pauses on hover/focus; the index dependency restarts the
  // timer after any manual navigation so a click always gets a full interval
  useEffect(() => {
    if (paused || count < 2) return
    const t = setInterval(() => go(1), AUTOPLAY_MS)
    return () => clearInterval(t)
  }, [go, paused, index, count])

  const current = shots[index]

  return (
    <div className="flex flex-col gap-4">
      {/* stage */}
      <div
        className="group relative aspect-[16/10] overflow-hidden rounded-sm border border-border bg-card"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute inset-0"
          >
            <Image
              src={current.src}
              alt={`${alt} — ${current.caption}`}
              fill
              priority={index === 0}
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover object-top"
            />
          </motion.div>
        </AnimatePresence>

        {/* prev / next */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screenshot"
          className="absolute left-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-sm border border-border bg-background/85 text-foreground opacity-0 backdrop-blur-md transition-all hover:bg-background group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screenshot"
          className="absolute right-3 top-1/2 z-10 grid size-10 -translate-y-1/2 place-items-center rounded-sm border border-border bg-background/85 text-foreground opacity-0 backdrop-blur-md transition-all hover:bg-background group-hover:opacity-100 focus-visible:opacity-100"
        >
          <ChevronRight className="size-5" />
        </button>

        {/* counter */}
        <span className="absolute right-3 top-3 z-10 rounded-sm border border-border bg-background/85 px-2.5 py-1 text-xs font-medium tabular-nums text-foreground backdrop-blur-md">
          {index + 1} / {count}
        </span>
      </div>

      {/* caption */}
      <p className="min-h-[1.5rem] text-sm font-light text-muted-foreground">{current.caption}</p>

      {/* thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {shots.map((shot, i) => (
          <button
            type="button"
            key={shot.src}
            onClick={() => setIndex(i)}
            aria-label={`Show screenshot ${i + 1}`}
            aria-current={i === index}
            className={`relative aspect-[16/10] overflow-hidden rounded-sm border transition-all ${
              i === index
                ? "border-foreground ring-1 ring-foreground"
                : "border-border opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="20vw"
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
