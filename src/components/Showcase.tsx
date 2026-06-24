"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUpRight,
  FileText,
  MapPin,
  Wind,
  Sparkles,
  Leaf,
  Dog,
  Lightbulb,
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

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const meta = STATUS_META[project.status]
  const Icon = INDUSTRY_ICON[project.industry] ?? Sparkles

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card transition-all duration-300 hover:border-foreground/25 hover:shadow-xl"
    >
      {/* full-card click target → storefront (sits below the case-study link) */}
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visit ${project.name} storefront`}
        className="absolute inset-0 z-10"
      />

      <div className="pointer-events-none relative z-20 flex h-full flex-col overflow-hidden rounded-sm bg-card">
        {/* live storefront screenshot */}
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/10 to-tertiary/10">
          <Image
            src={`/shots/${project.slug}.png`}
            alt={`${project.name} storefront`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
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
              Visit storefront
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
    <section id="showcase" className="relative scroll-mt-16 overflow-hidden pb-20 pt-12 md:pb-28 md:pt-16">
      {/* drifting brand wash behind the header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-gradient-to-br from-primary/80 via-secondary/60 to-tertiary/80 animate-gradient-xy" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-[32rem] w-[32rem] rounded-full bg-primary/50 blur-[120px]" />
      <div className="pointer-events-none absolute -top-20 left-1/5 h-[28rem] w-[28rem] rounded-full bg-tertiary/45 blur-[110px]" />
      <div className="pointer-events-none absolute -top-16 left-1/2 h-[24rem] w-[24rem] rounded-full bg-secondary/40 blur-[110px]" />
      {/* fade the wash into the page before the cards begin */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[460px] bg-gradient-to-b from-transparent via-background/20 to-background" />

      <div className="container relative z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              The portfolio
            </p>
            <h2 className="mt-3 font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-foreground">
              Different storefronts, one powerful engine.
            </h2>
            <p className="mt-4 max-w-2xl text-lg md:text-xl font-light text-foreground/80 leading-relaxed tracking-tight">
              SERV turns a home-service website into a checkout that sells 24/7 across every
              trade.
            </p>
            <p className="mt-2 text-sm font-light text-muted-foreground">
              {filter === "all"
                ? "Filter by where each build is in its journey."
                : STATUS_META[filter as Status].description}
            </p>
          </div>
        </motion.div>

        {/* filter pills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.key
            return (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`group relative inline-flex items-center gap-2 rounded-sm border px-4 py-2 text-sm font-medium transition-all ${
                  active
                    ? "border-transparent text-background"
                    : "border-border text-muted-foreground hover:text-foreground hover:border-foreground/30"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-sm bg-foreground"
                    transition={{ duration: 0.4, ease: EASE }}
                  />
                )}
                {f.label}
                <span
                  className={`rounded-sm px-1.5 py-0.5 text-xs tabular-nums ${
                    active ? "bg-background/20" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {f.count}
                </span>
              </button>
            )
          })}
        </div>

        {/* grid */}
        <motion.div layout className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <ProjectCard key={p.name} project={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
