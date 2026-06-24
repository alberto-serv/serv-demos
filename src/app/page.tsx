import { Showcase } from "@/components/Showcase"
import { Navbar, Footer } from "@/components/SiteChrome"

export default function Home() {
  return (
    <main id="top" className="min-h-screen scroll-smooth">
      <Navbar />
      <Showcase />
      <Footer />
    </main>
  )
}
