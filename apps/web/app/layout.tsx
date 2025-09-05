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
  title: "Accessaurus",
  description: "Modern access management for your SaaS",
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
              <Link href="/" className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-md bg-primary" />
                <span className="text-sm font-semibold tracking-tight">
                  Accessaurus
                </span>
              </Link>
              <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
                <a href="#features" className="hover:text-foreground">
                  Features
                </a>
                <a href="#pricing" className="hover:text-foreground">
                  Pricing
                </a>
                <a href="#faqs" className="hover:text-foreground">
                  FAQ
                </a>
                <a
                  href="https://docs.example.com"
                  className="hover:text-foreground"
                  target="_blank"
                  rel="noreferrer"
                >
                  Docs
                </a>
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
