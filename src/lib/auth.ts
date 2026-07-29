/**
 * Password gate for the showcase.
 *
 * `/customers` and the `/projects/*` detail pages it links to stay public — that
 * cut of the site is what gets shared with customers. Everything else (the full
 * gallery at `/`, plus any route added later) needs the password.
 *
 * Set `SITE_PASSWORD` in the Vercel project to change it without a deploy.
 */
export const AUTH_COOKIE = "serv_showcase_auth"

/** 30 days — long enough that the team isn't re-typing it every visit. */
export const AUTH_MAX_AGE = 60 * 60 * 24 * 30

const PASSWORD = process.env.SITE_PASSWORD ?? "Serv!"

/**
 * The cookie never holds the password itself, just a hash of it. Deterministic
 * so every serverless instance derives the same value, and rotating
 * `SITE_PASSWORD` invalidates every session already issued.
 */
export async function sessionToken(): Promise<string> {
  const data = new TextEncoder().encode(`serv-showcase::${PASSWORD}`)
  const digest = await crypto.subtle.digest("SHA-256", data)
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
}

export function isCorrectPassword(input: string): boolean {
  return input === PASSWORD
}

/** Paths served without the password, plus anything nested under them. */
const PUBLIC_PATHS = ["/customers", "/projects", "/login"]

export function isPublicPath(pathname: string): boolean {
  return PUBLIC_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))
}
