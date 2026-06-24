export type Status = "live" | "dev" | "demo" | "admin"

export interface ProjectShot {
  src: string
  caption: string
}

export interface ProjectDetail {
  /** one-line positioning shown under the title on the detail page */
  tagline: string
  /** a couple of paragraphs about the build */
  overview: string[]
  /** quick facts rendered as a small spec list */
  highlights: { label: string; value: string }[]
  /** ordered screenshots powering the slideshow */
  shots: ProjectShot[]
}

export interface Project {
  name: string
  slug: string
  industry: string
  location?: string
  url: string
  caseStudy?: string
  status: Status
  blurb: string
  /** overrides the default `/shots/<slug>.png` thumbnail on the showcase card */
  cardImage?: string
  /** when present, the card opens an in-app detail page instead of the live storefront */
  detail?: ProjectDetail
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
    cardImage: "/shots/up-closets/quote-walkin.png",
    detail: {
      tagline: "A design-led closet purchase, configured and booked online in minutes.",
      overview: [
        "Custom closets are a classic “get a quote, wait for a call” sale. Up Closets turns that into a self-serve storefront: customers pick a space, dial in size, finish and add-ons, and watch the price update live — no truck roll required to put a number in front of them.",
        "The same configurator engine powers every room type, from a walk-in closet to a pantry, so one build covers the entire catalog. When a customer is ready, they book a design appointment and land on a clean confirmation — the lead arrives fully qualified with the configuration attached.",
      ],
      highlights: [
        { label: "Vertical", value: "Custom Closets" },
        { label: "Market", value: "Nashville, TN" },
        { label: "Flow", value: "Configure → Quote → Book" },
        { label: "Outcome", value: "Design-led sales closed online" },
      ],
      shots: [
        {
          src: "/shots/up-closets/home.png",
          caption: "Start by picking a space — walk-in, reach-in, pantry, garage and more.",
        },
        {
          src: "/shots/up-closets/quote-walkin.png",
          caption: "The walk-in closet configurator prices size, level and finish in real time.",
        },
        {
          src: "/shots/up-closets/quote-pantry.png",
          caption: "The same engine, retuned for a pantry build — one system, every room.",
        },
        {
          src: "/shots/up-closets/confirmation-v2.png",
          caption: "Configuration complete: the design appointment is booked and summarized.",
        },
      ],
    },
  },
  {
    name: "Voda Cleaning & Restoration",
    slug: "voda",
    industry: "Cleaning & Restoration",
    location: "Hartford, CT",
    url: "https://book.myvoda.com/voda-cleaning-restoration-of-hartford?booking_source=website",
    status: "live",
    blurb: "Emergency and scheduled restoration jobs captured straight from the website.",
    detail: {
      tagline:
        "Quote, schedule and book a cleaning or restoration job in one flow — no phone tag, no waiting on an estimate.",
      overview: [
        "Cleaning and restoration is high-consideration but time-sensitive, and price varies by room, condition and add-ons. Voda turns it into a self-serve booking flow: customers tap services on an interactive cutaway of the home, configure each one inline — room counts, furnished vs. vacant, and a Bronze/Silver/Gold tier — while a running total updates instantly.",
        "From there they pick a date and appointment window, add their details, and review a transparent summary before a clean “Booking Confirmed” page. Capturing intent at its peak keeps the lead off the callback queue and hands the crew an accurate scope before they arrive — while an always-visible Emergency & Restoration line gives urgent water, fire and mold jobs an immediate path in.",
      ],
      highlights: [
        { label: "Vertical", value: "Cleaning & Restoration" },
        { label: "Market", value: "Hartford, CT" },
        { label: "Flow", value: "Select → Configure → Schedule → Confirm" },
        { label: "Outcome", value: "Self-booked jobs + emergency capture" },
      ],
      shots: [
        {
          src: "/shots/voda/services.png",
          caption: "Browse the full catalog on an interactive home cutaway, with an always-on emergency line.",
        },
        {
          src: "/shots/voda/selected.png",
          caption: "Configure each service — rooms, condition and service level — as a live total tallies.",
        },
        {
          src: "/shots/voda/schedule.png",
          caption: "Pick a date and window and add details, with the order summary locking the slot.",
        },
        {
          src: "/shots/voda/confirmation.png",
          caption: "Booking confirmed — appointment, services, total and a clear what's-next plan.",
        },
      ],
    },
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
    detail: {
      tagline:
        "Configuration-priced dryer vent jobs — quoted, scheduled and paid online in under a minute.",
      overview: [
        "Dryer vent cleaning normally stalls on a manual estimate call, because the price genuinely depends on the setup — where the vent exits and how high it runs. SERV turns that into a self-serve storefront: customers pick a service from a visual cutaway of the home, set the variables that actually move price (side, roof or second-floor exit; annual vs. one-time), and watch the quote update live.",
        "A single “Continue” carries the selection into a combined scheduling and contact step backed by a running order summary, then card payment, then a clean “Booking Confirmed” recap. The annual-plan toggle nudges a one-time clean into recurring revenue, and capturing payment up front turns a quote into a confirmed, paid appointment instead of a callback.",
      ],
      highlights: [
        { label: "Vertical", value: "Dryer Vent Cleaning" },
        { label: "Market", value: "Kansas City, MO" },
        { label: "Flow", value: "Service → Quote → Schedule → Pay" },
        { label: "Outcome", value: "Paid bookings + annual-plan upsell" },
      ],
      shots: [
        {
          src: "/shots/dvsh/services.png",
          caption: "Pick a service from an interactive cutaway of the home — cleanings, bundles and repairs.",
        },
        {
          src: "/shots/dvsh/quote.png",
          caption: "Set the exit type and plan and the price updates live — here $212/yr on the annual plan.",
        },
        {
          src: "/shots/dvsh/schedule.png",
          caption: "Scheduling and contact details in one step, backed by a running order summary.",
        },
        {
          src: "/shots/dvsh/confirmation.png",
          caption: "Booking confirmed — appointment, itemized total and customer details all captured.",
        },
      ],
    },
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
    detail: {
      tagline:
        "Pick a program, see the price, book a hero — recurring lawn care sold like a subscription.",
      overview: [
        "Recurring lawn care is really a decision about fit and predictability, not a one-time price. Heroes Lawn Care turns the quote into a single guided scroll: choose a service, set your lawn size on a five-stop slider, and a three-tier program comparison — Basic, Plus, Complete — instantly reprices against that size, showing real per-visit and season-long totals before anyone talks to a rep.",
        "One “Get a Free Estimate” tap carries the chosen package and yard size into a short, address-verified booking form. Letting homeowners size their own lawn and watch the tiers reprice builds trust and qualifies the lead before a truck ever rolls — fewer estimate calls, faster booking, and a clean path into a multi-visit seasonal contract.",
      ],
      highlights: [
        { label: "Vertical", value: "Lawn Care" },
        { label: "Market", value: "The Woodlands, TX" },
        { label: "Flow", value: "Service → Size → Program → Book" },
        { label: "Outcome", value: "Address-verified subscription leads" },
      ],
      shots: [
        {
          src: "/shots/heroes-lawn/hero.png",
          caption: "“Every lawn needs a hero” — the storefront that opens the recurring-care sale.",
        },
        {
          src: "/shots/heroes-lawn/select.png",
          caption: "Choose a service and dial in lawn size on the slider — here Standard, 5–7,000 sq ft.",
        },
        {
          src: "/shots/heroes-lawn/programs.png",
          caption: "Basic, Plus and Complete tiers, priced live per visit against the chosen lawn size.",
        },
        {
          src: "/shots/heroes-lawn/estimate.png",
          caption: "A pre-filled, address-verified estimate — one tap from booking the program.",
        },
      ],
    },
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
    industry: "Handyman Services",
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
]

export const STATUS_ORDER: Status[] = ["live", "dev", "admin", "demo"]
