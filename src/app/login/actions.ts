"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { AUTH_COOKIE, AUTH_MAX_AGE, isCorrectPassword, sessionToken } from "@/lib/auth"

export type LoginState = { error?: string }

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const password = String(formData.get("password") ?? "")

  if (!isCorrectPassword(password)) {
    return { error: "That's not the password. Try again." }
  }

  const store = await cookies()
  store.set(AUTH_COOKIE, await sessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: AUTH_MAX_AGE,
  })

  // Only ever bounce to a path on this site — never an absolute URL.
  const next = String(formData.get("next") ?? "")
  const destination = next.startsWith("/") && !next.startsWith("//") ? next : "/"
  redirect(destination)
}
