import { NextResponse, type NextRequest } from "next/server"
import { AUTH_COOKIE, isPublicPath, sessionToken } from "@/lib/auth"

export default async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl

  if (isPublicPath(pathname)) return NextResponse.next()

  const token = request.cookies.get(AUTH_COOKIE)?.value
  if (token && token === (await sessionToken())) return NextResponse.next()

  const url = request.nextUrl.clone()
  url.pathname = "/login"
  url.search = ""
  // Send them back where they were headed once they're in. "/" is the default
  // landing spot, so it only needs carrying when it has a query string.
  const destination = `${pathname}${search}`
  if (destination !== "/") url.searchParams.set("next", destination)
  return NextResponse.redirect(url)
}

export const config = {
  // Skip Next internals and anything with a file extension — the images under
  // /public/shots have to stay reachable or the public /customers page breaks.
  matcher: ["/((?!_next/static|_next/image|.*\\.[\\w]+$).*)"],
}
