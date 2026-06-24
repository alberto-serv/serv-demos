import type { Metadata } from "next"
import { Instrument_Sans, Outfit } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
})

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata: Metadata = {
  title: "SERV — The Showcase",
  description:
    "How home service businesses sell online 24/7 with SERV. Live storefronts, in-development builds, and demos across every trade.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={cn(
          instrumentSans.variable,
          outfit.variable,
          "font-sans antialiased bg-background text-foreground",
        )}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  )
}
