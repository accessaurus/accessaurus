import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Accessaurus — Accessible SEO & Structured Data SDK",
  description:
    "Drop-in SDK for Next.js that generates accessible titles, meta tags, Schema.org JSON-LD, and on-site search synonyms — server-first, secure, and cost-aware.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" aria-label="Accessaurus home">
                <Image
                  src="/logo.png"
                  alt="Accessaurus logo"
                  width={32}
                  height={32}
                  sizes="32px"
                  className="h-8 w-8"
                  priority
                />
                <span className="text-base font-semibold tracking-tight">Accessaurus</span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#why" className="hover:text-foreground">Why It Matters</a>
                <a href="#features" className="hover:text-foreground">Features</a>
              </nav>
              <div className="flex items-center gap-2">
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button variant="ghost">Sign in</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button>Get started</Button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link href="/app">
                    <Button variant="secondary">Open App</Button>
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
