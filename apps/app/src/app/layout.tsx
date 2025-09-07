import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: {
    template: '%s - Accessaurus',
    default: 'Accessaurus Dashboard',
  },
  description: 'Generate SEO meta tags, Schema.org JSON-LD, and WCAG compliant content automatically',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
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
