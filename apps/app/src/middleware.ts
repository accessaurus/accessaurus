import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  // Public demo routes for semantic transformer
  '/semantify(.*)',
  '/api/semantify(.*)',
  // Public SDK endpoints
  '/api/sdk(.*)'
])

export default clerkMiddleware(
  async (auth, req) => {
    // Protect all routes except public ones
    if (!isPublicRoute(req)) {
      await auth.protect()
    }
  },
  {
    // Enable organization sync - automatically set active org based on URL
    organizationSyncOptions: {
      organizationPatterns: [
        '/org/:slug',
        '/org/:slug/(.*)',
      ],
    },
  }
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
