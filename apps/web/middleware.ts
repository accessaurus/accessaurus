// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isProtectedRoute(req)) return;

  const url = req.nextUrl;

  // If we already asked for sign-in, serve a public stub via rewrite
  if (url.searchParams.get("signin") === "1") {
    const rewriteUrl = new URL("/app/signed-out", url);
    return NextResponse.rewrite(rewriteUrl);
  }

  // Enforce auth server-side, but keep users on the same path with a modal
  await auth.protect({ unauthenticatedUrl: `${url.pathname}?signin=1` });
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
