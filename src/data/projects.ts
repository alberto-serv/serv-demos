export type Status = "live" | "dev" | "demo" | "admin"

export interface Project {
  name: string
  slug: string
  industry: string
  location?: string
  url: string
  caseStudy?: string
  status: Status
  blurb: string
}

export const STATUS_META: Record<
  Status,
  { label: string; tag: string; accent: string; dot: string; description: string }
> = {
  live: {
    label: "Live",
    tag: "In production",
    accent: "var(--primary)",
    dot: "bg-primary",
    description: "Real businesses selling online 24/7, right now.",
  },
  dev: {
    label: "In Development",
    tag: "Shipping soon",
    accent: "var(--tertiary)",
    dot: "bg-tertiary",
    description: "Storefronts being tailored to launch.",
  },
  demo: {
    label: "Demos",
    tag: "Concept build",
    accent: "var(--secondary)",
    dot: "bg-secondary",
    description: "Show-and-tell builds proving the model across new verticals.",
  },
  admin: {
    label: "Operator Tools",
    tag: "Behind the counter",
    accent: "var(--foreground)",
    dot: "bg-foreground",
    description: "The control room franchisees use to run it all.",
  },
}

export const projects: Project[] = [
  // ---------------- LIVE ----------------
  {
    name: "Up Closets",
    slug: "up-closets",
    industry: "Custom Closets",
    location: "Nashville, TN",
    url: "https://www.book.upclosets.com/up-closets-of-nashville/estimate",
    caseStudy: "https://na2.hubs.ly/H06bljJ0",
    status: "live",
    blurb: "Configure-and-quote custom storage — design-led purchases closed online.",
  },
  {
    name: "Dryer Vent Superheroes",
    slug: "dvsh",
    industry: "Dryer Vent Cleaning",
    location: "Kansas City, MO",
    url: "https://book.dryerventheroes.com/dryer-vent-superheroes-of-kansas-city",
    caseStudy: "https://na2.hubs.ly/H05VlfH0",
    status: "live",
    blurb: "Instant booking for a service customers used to wait days to schedule.",
  },
  {
    name: "Heroes Lawn Care",
    slug: "heroes-lawn",
    industry: "Lawn Care",
    location: "The Woodlands, TX",
    url: "https://buy.heroeslawncare.com/woodlands-tx",
    caseStudy: "https://na2.hubs.ly/H05VldV0",
    status: "live",
    blurb: "Recurring lawn programs sold like a subscription, no truck roll to quote.",
  },
  {
    name: "Voda Cleaning & Restoration",
    slug: "voda",
    industry: "Cleaning & Restoration",
    location: "Hartford, CT",
    url: "https://book.myvoda.com/voda-cleaning-restoration-of-hartford?booking_source=website",
    status: "live",
    blurb: "Emergency and scheduled restoration jobs captured straight from the website.",
  },
  {
    name: "Poo Squad",
    slug: "poo-squad",
    industry: "Pet Waste Removal",
    location: "Riverside, CA",
    url: "https://book.poosquad.com/poo-squad-riverside/quote?location=riverside",
    status: "live",
    blurb: "Routine pet-waste plans priced and signed up in under a minute.",
  },

  // ---------------- IN DEVELOPMENT ----------------
  {
    name: "Lighting Squad",
    slug: "lighting-squad",
    industry: "Outdoor Lighting",
    url: "https://lightingsquad.vercel.app/estimate/services",
    status: "dev",
    blurb: "Guided estimate flow for permanent and seasonal lighting installs.",
  },
  {
    name: "Generator Partners — Kenerator",
    slug: "kenerator",
    industry: "Standby Generators",
    url: "https://v0-kenerator-generator-app-lovat.vercel.app/genpro-proposal",
    status: "dev",
    blurb: "High-ticket generator proposals turned into a clean online checkout.",
  },
  {
    name: "Grasshopper Group",
    slug: "grasshopper",
    industry: "Field Services",
    url: "https://hummingbird-pricing.vercel.app/portal/login",
    status: "dev",
    blurb: "A pricing portal unifying quotes across a multi-brand group.",
  },
  {
    name: "Anago",
    slug: "anago",
    industry: "Commercial Cleaning",
    url: "https://v0-anago-cleaning.vercel.app/",
    status: "dev",
    blurb: "Commercial janitorial bids, productized for self-serve buyers.",
  },

  // ---------------- OPERATOR TOOLS ----------------
  {
    name: "Voda Onboarding",
    slug: "voda-onboarding",
    industry: "Franchisee Onboarding",
    url: "https://voda-onboarding.vercel.app/location",
    status: "admin",
    blurb: "How a new Voda location goes from signup to selling — self-serve setup.",
  },

  // ---------------- DEMOS ----------------
  {
    name: "Koala Insulation",
    slug: "koala",
    industry: "Insulation",
    url: "https://koala-insulation.vercel.app/",
    status: "demo",
    blurb: "Energy-savings story tied directly to an instant insulation quote.",
  },
  {
    name: "Go Minis",
    slug: "go-minis",
    industry: "Portable Storage",
    url: "https://go-mini-two.vercel.app/",
    status: "demo",
    blurb: "Container rental and moving, booked like ordering a ride.",
  },
  {
    name: "Glass Guardians",
    slug: "glass-guardians",
    industry: "Window Cleaning",
    url: "https://glass-guardians.vercel.app/estimate/services",
    status: "demo",
    blurb: "Pane-by-pane estimate builder for residential glass care.",
  },
  {
    name: "Ryan Lawn & Tree",
    slug: "ryan-lawn",
    industry: "Lawn & Tree Care",
    url: "https://v0-ryan-lawn.vercel.app/",
    status: "demo",
    blurb: "Full-program lawn, tree and pest care bundled into one cart.",
  },
]

export const STATUS_ORDER: Status[] = ["live", "dev", "admin", "demo"]
