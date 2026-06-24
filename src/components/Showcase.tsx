"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowUpRight,
  FileText,
  MapPin,
  Wind,
  Sparkles,
  Leaf,
  Dog,
  Lightbulb,
  Hammer,
  Zap,
  Layers,
  Building2,
  ThermometerSun,
  Container,
  GlassWater,
  Bath,
  Trees,
  Settings2,
  type LucideIcon,
} from "lucide-react"
import { projects, STATUS_META, STATUS_ORDER, type Project, type Status } from "@/data/projects"

const EASE = [0.16, 1, 0.3, 1] as const

const INDUSTRY_ICON: Record<string, LucideIcon> = {
  "Custom Closets": Layers,
  "Dryer Vent Cleaning": Wind,
  "Lawn Care": Leaf,
  "Cleaning & Restoration": Sparkles,
  "Pet Waste Removal": Dog,
  "Outdoor Lighting": Lightbulb,
  "Handyman Services": Hammer,
  "Standby Generators": Zap,
  "Field Services": Settings2,
  "Commercial Cleaning": Building2,
  Insulation: ThermometerSun,
  "Portable Storage": Container,
  "Window Cleaning": GlassWater,
  "Bath Remodeling": Bath,
  "Lawn & Tree Care": Trees,
  "Franchisee Onboarding": Settings2,
}

type Filter = "all" | Status

function ProjectCard({ project, className = "" }: { project: Project; className?: string }) {
  const meta = STATUS_META[project.status]
  const Icon = INDUSTRY_ICON[project.industry] ?? Sparkles
  const hasDetail = Boolean(project.detail)
  const shots = project.detail?.shots ?? []
  const hasShots = shots.length > 1

  // hovering a card with a slideshow cross-fades through its PDP screenshots,
  // after a short hold on the static card image
  const [started, setStarted] = useState(false)
  const [shotIndex, setShotIndex] = useState(0)
  // the slide leaving stays visible beneath the incoming one so the base never flashes
  const [prevIndex, setPrevIndex] = useState<number | null>(null)
  const idxRef = useRef(0)
  idxRef.current = shotIndex
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!started || !hasShots) return
    const t = setInterval(() => {
      setPrevIndex(idxRef.current)
      setShotIndex((idxRef.current + 1) % shots.length)
    }, 1600)
    return () => clearInterval(t)
  }, [started, hasShots, shots.length])

  // clear a pending start if the card unmounts mid-hover (e.g. on filter change)
  useEffect(() => () => clearTimeout(startTimer.current ?? undefined), [])

  const beginHover = () => {
    if (!hasShots) return
    setShotIndex(1) // start the cycle on the second slide
    setPrevIndex(null)
    startTimer.current = setTimeout(() => setStarted(true), 650)
  }
  const endHover = () => {
    clearTimeout(startTimer.current ?? undefined)
    setStarted(false)
    setShotIndex(1)
    setPrevIndex(null)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onMouseEnter={beginHover}
      onMouseLeave={endHover}
      className={`group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-xl ${className}`}
    >
      {/* full-card click target → in-app detail page when one exists, else the live storefront */}
      {hasDetail ? (
        <Link
          href={`/projects/${project.slug}`}
          aria-label={`View the ${project.name} project`}
          className="absolute inset-0 z-10"
        />
      ) : (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${project.name} storefront`}
          className="absolute inset-0 z-10"
        />
      )}

      <div className="pointer-events-none relative z-20 flex h-full flex-col overflow-hidden rounded-sm bg-card">
        {/* live storefront screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10">
          <Image
            src={project.cardImage ?? `/shots/${project.slug}.png`}
            alt={`${project.name} storefront`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top"
          />
          {/* on hover, cross-fade through the project's slideshow screenshots.
              isolate keeps the slide z-stacking from escaping over the scrim/badges */}
          {hasShots && (
            <div className="pointer-events-none absolute inset-0 isolate">
              {shots.map((shot, i) => (
                <Image
                  key={shot.src}
                  src={shot.src}
                  alt=""
                  aria-hidden
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={`absolute inset-0 object-cover object-top transition-opacity duration-[900ms] ease-in-out ${
                    started && (i === shotIndex || i === prevIndex) ? "opacity-100" : "opacity-0"
                  } ${i === shotIndex ? "z-[2]" : i === prevIndex ? "z-[1]" : "z-0"}`}
                />
              ))}
            </div>
          )}
          {/* scrim so the badges stay legible */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-background/10" />
          {/* status badge */}
          <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
            <span className={`size-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
          {/* TRADE badge — what this product card represents */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-md">
            <Icon className="size-3.5 text-primary" />
            {project.industry}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
            {project.name}
          </h3>
          {project.location && (
            <div className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="size-3.5" />
              {project.location}
            </div>
          )}

          <p className="mt-4 flex-1 text-sm font-light leading-relaxed text-muted-foreground">
            {project.blurb}
          </p>

          <div className="mt-6 flex items-center gap-2 border-t border-border pt-5">
            {/* primary CTA — visual button; the full-card overlay anchor handles the click */}
            <span className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-sm bg-foreground text-sm font-semibold text-background transition-colors group-hover:bg-primary">
              {hasDetail ? "View project" : "Visit storefront"}
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
            {project.caseStudy && (
              <a
                href={project.caseStudy}
                target="_blank"
                rel="noopener noreferrer"
                className="pointer-events-auto relative z-30 inline-flex h-10 items-center gap-1.5 rounded-sm border border-border bg-background px-3.5 text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/50"
              >
                <FileText className="size-4 text-primary" />
                Case study
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function Showcase() {
  const [filter, setFilter] = useState<Filter>("all")

  const counts = STATUS_ORDER.reduce(
    (acc, s) => ({ ...acc, [s]: projects.filter((p) => p.status === s).length }),
    {} as Record<Status, number>,
  )

  const filtered = filter === "all" ? projects : projects.filter((p) => p.status === filter)

  const filters: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Everything", count: projects.length },
    ...STATUS_ORDER.map((s) => ({ key: s, label: STATUS_META[s].label, count: counts[s] })),
  ]

  return (
    <section id="showcase" className="relative scroll-mt-16 pb-10 md:pb-12">
      {/* full-bleed animated brand gradient band */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="bg-gradient-to-r from-primary/45 via-secondary/30 to-tertiary/40 animate-gradient-xy"
      >
        <div className="container mx-auto px-4 py-8 md:py-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            The portfolio
          </p>
          <h2 className="mt-3 max-w-3xl font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-foreground">
            Different storefronts, one powerful engine.
          </h2>
          <p className="mt-4 max-w-2xl text-lg md:text-xl font-light text-foreground/80 leading-relaxed tracking-tight">
            SERV turns a home-service website into a checkout that sells 24/7 across every trade.{" "}
            {filter === "all"
              ? "Filter by where each build is in its journey."
              : STATUS_META[filter as Status].description}
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4">
        {/* filter pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-transparent text-background"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                {f.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs tabular-nums ${
                    active ? "bg-background/20" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* grid — first 4 cards form an oversized 2×2 block, the rest stay 3-up */}
        <div key={filter} className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {filtered.map((p, i) => (
            <ProjectCard
              key={p.name}
              project={p}
              className={i < 4 ? "lg:col-span-3" : "lg:col-span-2"}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
