
import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const sessionCookie = getSessionCookie(request);
  const path = request.nextUrl.pathname;

  // Check 1: Login
  if (!sessionCookie) {
    return NextResponse.redirect(
      new URL("/login", request.url)
    );
  }

  // Check 2: Admin access
  if (path.startsWith("/dashboard/admin")) {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (session?.user?.role !== "admin") {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile"],
};
