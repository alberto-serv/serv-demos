"use client"

import Image from "next/image"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/serv-logo.png"
            alt="SERV"
            width={355}
            height={155}
            priority
            className="h-7 w-auto"
          />
          {/* logo wordmark sits low in its box → nudge label down to align with "SERV" */}
          <span className="hidden translate-y-[5px] text-sm text-muted-foreground sm:inline-block">
            / Showcase
          </span>
        </a>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:flex-row">
        <Image src="/serv-logo.png" alt="SERV" width={355} height={155} className="h-6 w-auto" />
        <span>Home services, sold online 24/7.</span>
        <span>© {2026} SERV</span>
      </div>
    </footer>
  )
}
