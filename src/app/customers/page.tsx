import { Showcase } from "@/components/Showcase"
import { Navbar, Footer } from "@/components/SiteChrome"
import { projects } from "@/data/projects"

// Customer-facing cut of the showcase — hides the Koala and Go Minis demo builds.
const HIDDEN_SLUGS = new Set(["koala", "go-minis"])
const customerProjects = projects.filter((p) => !HIDDEN_SLUGS.has(p.slug))

export default function Customers() {
  return (
    <main id="top" className="min-h-screen scroll-smooth">
      <Navbar />
      <Showcase items={customerProjects} />
      <Footer />
    </main>
  )
}
