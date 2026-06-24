// SERV brand fonts — wire these into app/layout.tsx
//
//   import { instrumentSans, outfit } from "@/branding/fonts"
//   import { cn } from "@/lib/utils"
//   ...
//   <body className={cn(instrumentSans.variable, outfit.variable, "font-sans antialiased bg-background text-foreground")}>
//
import { Instrument_Sans, Outfit } from "next/font/google"

// Body / UI — the default sans
export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

// Headings — font-heading
export const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})
