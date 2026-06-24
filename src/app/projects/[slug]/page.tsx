import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowUpRight, FileText, MapPin } from "lucide-react"
import { Navbar, Footer } from "@/components/SiteChrome"
import { ProjectGallery } from "@/components/ProjectGallery"
import { projects, STATUS_META } from "@/data/projects"

export function generateStaticParams() {
  return projects.filter((p) => p.detail).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project) return {}
  return {
    title: `${project.name} — SERV Showcase`,
    description: project.detail?.tagline ?? project.blurb,
  }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = projects.find((p) => p.slug === slug)
  if (!project || !project.detail) notFound()

  const { detail } = project
  const meta = STATUS_META[project.status]

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="relative pb-20 md:pb-28">
        {/* full-bleed animated brand gradient band */}
        <div className="bg-gradient-to-r from-primary/45 via-secondary/30 to-tertiary/40 animate-gradient-xy">
          <div className="container mx-auto px-4 py-8 md:py-10">
            {/* back link */}
            <Link
              href="/#showcase"
              className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" />
              Back to showcase
            </Link>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-background/85 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur-md">
                <span className={`size-1.5 rounded-full ${meta.dot}`} />
                {meta.label}
              </span>
              <span className="inline-flex items-center rounded-sm border border-border bg-background/85 px-2.5 py-1 text-xs font-semibold text-foreground backdrop-blur-md">
                {project.industry}
              </span>
              {project.location && (
                <span className="inline-flex items-center gap-1 text-sm text-foreground/70">
                  <MapPin className="size-3.5" />
                  {project.location}
                </span>
              )}
            </div>

            <h1 className="mt-4 font-heading text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[0.95] text-foreground">
              {project.name}
            </h1>
            <p className="mt-3 max-w-2xl text-lg md:text-xl font-light text-foreground/80 leading-relaxed tracking-tight">
              {detail.tagline}
            </p>
          </div>
        </div>

        {/* body */}
        <div className="container mx-auto px-4">
          <div className="mt-12 grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-12">
            {/* slideshow */}
            <ProjectGallery shots={detail.shots} alt={project.name} />

            {/* details rail */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                {detail.overview.map((para, i) => (
                  <p
                    key={i}
                    className="text-sm md:text-base font-light leading-relaxed text-muted-foreground"
                  >
                    {para}
                  </p>
                ))}
              </div>

              {/* quick facts */}
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
                {detail.highlights.map((h) => (
                  <div key={h.label} className="bg-card p-4">
                    <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                      {h.label}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold text-foreground">{h.value}</dd>
                  </div>
                ))}
              </dl>

              {/* links */}
              <div className="flex flex-col gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-sm bg-foreground text-sm font-semibold text-background transition-colors hover:bg-primary"
                >
                  Visit live storefront
                  <ArrowUpRight className="size-4" />
                </a>
                {project.caseStudy && (
                  <a
                    href={project.caseStudy}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center justify-center gap-1.5 rounded-sm border border-border bg-background text-sm font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-muted/50"
                  >
                    <FileText className="size-4 text-primary" />
                    Read the case study
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
