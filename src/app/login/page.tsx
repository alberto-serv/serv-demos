import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { AnimatedGradient } from "@/components/AnimatedGradient"
import { LoginForm } from "./LoginForm"

export const metadata: Metadata = {
  title: "SERV — The Showcase",
  description: "Password required.",
  robots: { index: false, follow: false },
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>
}) {
  const { next } = await searchParams

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden px-4 py-16">
      <AnimatedGradient variant="cta" />

      <div className="relative z-10 w-full max-w-md rounded-sm border border-white/20 bg-background/95 p-8 shadow-2xl backdrop-blur-sm md:p-10">
        <Image
          src="/serv-logo.png"
          alt="SERV"
          width={355}
          height={155}
          priority
          className="h-8 w-auto"
        />

        <h1 className="mt-6 font-heading text-3xl font-bold tracking-tighter text-foreground">
          The Showcase
        </h1>
        <p className="mt-2 text-sm font-light leading-relaxed text-muted-foreground">
          This portfolio is private. Enter the password to see every build.
        </p>

        <div className="mt-8">
          <LoginForm next={next} />
        </div>

        <p className="mt-6 border-t border-border pt-6 text-sm font-light text-muted-foreground">
          Looking for the customer showcase?{" "}
          <Link
            href="/customers"
            className="inline-flex items-center gap-0.5 font-medium text-primary hover:underline"
          >
            It&apos;s open to everyone
            <ArrowUpRight className="size-3.5" />
          </Link>
        </p>
      </div>
    </main>
  )
}
