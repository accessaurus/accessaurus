import { SanityLive } from '@/sanity/live'
import { revalidateSyncTags } from '@/sanity/revalidateSyncTags'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: {
    template: '%s - Accessaurus',
    default: 'Accessaurus - Making the Web Accessible for All',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://api.fontshare.com/css?f%5B%5D=switzer@400,500,600,700&amp;display=swap"
          />
          <link
            rel="alternate"
            type="application/rss+xml"
            title="The Accessaurus Blog"
            href="/blog/feed.xml"
          />
        </head>
        <body className="text-gray-950 antialiased">
          {children}
          <SanityLive revalidateSyncTags={revalidateSyncTags} />
        </body>
      </html>
    </ClerkProvider>
  )
}
