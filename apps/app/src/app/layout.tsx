import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: {
    template: '%s - Accessaurus',
    default: 'Accessaurus Dashboard',
  },
  description: 'Upgrade markup into semantic, accessible HTML with conservative heuristics and optional AI assistance',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <html
        lang="en"
        className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950"
      >
        <head>
          <link rel="preconnect" href="https://rsms.me/" />
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
        </head>
        <body>{children}</body>
      </html>
    </ClerkProvider>
  )
}
