'use client'

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react'
import { Bars2Icon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'
import { Link } from './link'
import { Logo } from './logo'
import { PlusGrid, PlusGridItem, PlusGridRow } from './plus-grid'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Button } from './button'
import { getAppUrl } from '@/lib/config'

const links = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/company', label: 'Company' },
  { href: '/blog', label: 'Blog' },
]

function DesktopNav() {
  return (
    <nav className="relative hidden lg:flex items-center">
      {links.map(({ href, label }) => (
        <PlusGridItem key={href} className="relative flex">
          <Link
            href={href}
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5"
          >
            {label}
          </Link>
        </PlusGridItem>
      ))}
      
      <SignedOut>
        <PlusGridItem className="relative flex">
          <Link
            href="/sign-in"
            className="flex items-center px-4 py-3 text-base font-medium text-gray-950 bg-blend-multiply data-hover:bg-black/2.5"
          >
            Sign In
          </Link>
        </PlusGridItem>
        <PlusGridItem className="relative flex ml-2">
          <Button href="/sign-up" className="!py-2">
            Get Started
          </Button>
        </PlusGridItem>
      </SignedOut>
      
      <SignedIn>
        <PlusGridItem className="relative flex ml-2">
          <Button href={getAppUrl()} className="!py-2 mr-3">
            Dashboard
          </Button>
        </PlusGridItem>
        <PlusGridItem className="relative flex items-center">
          <UserButton afterSignOutUrl="/" />
        </PlusGridItem>
      </SignedIn>
    </nav>
  )
}

function MobileNavButton() {
  return (
    <DisclosureButton
      className="flex size-12 items-center justify-center self-center rounded-lg data-hover:bg-black/5 lg:hidden"
      aria-label="Open main menu"
    >
      <Bars2Icon className="size-6" />
    </DisclosureButton>
  )
}

function MobileNav() {
  return (
    <DisclosurePanel className="lg:hidden">
      <div className="flex flex-col gap-6 py-4">
        {links.map(({ href, label }, linkIndex) => (
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: linkIndex * 0.1 },
            }}
            key={href}
          >
            <Link href={href} className="text-base font-medium text-gray-950">
              {label}
            </Link>
          </motion.div>
        ))}
        
        <SignedOut>
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: links.length * 0.1 },
            }}
          >
            <Link href="/sign-in" className="text-base font-medium text-gray-950">
              Sign In
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: (links.length + 1) * 0.1 },
            }}
          >
            <Button href="/sign-up" className="w-full">
              Get Started
            </Button>
          </motion.div>
        </SignedOut>
        
        <SignedIn>
          <motion.div
            initial={{ opacity: 0, rotateX: -90 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.15,
              ease: 'easeInOut',
              rotateX: { duration: 0.3, delay: links.length * 0.1 },
            }}
          >
            <Button href={getAppUrl()} className="w-full mb-2">
              Dashboard
            </Button>
          </motion.div>
          <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" />
            <span className="text-base font-medium text-gray-950">Account</span>
          </div>
        </SignedIn>
      </div>
      <div className="absolute left-1/2 w-screen -translate-x-1/2">
        <div className="absolute inset-x-0 top-0 border-t border-black/5" />
        <div className="absolute inset-x-0 top-2 border-t border-black/5" />
      </div>
    </DisclosurePanel>
  )
}

export function Navbar({ banner }: { banner?: React.ReactNode }) {
  return (
    <Disclosure as="header" className="pt-12 sm:pt-16">
      <PlusGrid>
        <PlusGridRow className="relative flex justify-between">
          <div className="relative flex gap-6">
            <PlusGridItem className="py-3">
              <Link href="/" title="Home">
                <Logo className="h-9" />
              </Link>
            </PlusGridItem>
            {banner && (
              <div className="relative hidden items-center py-3 lg:flex">
                {banner}
              </div>
            )}
          </div>
          <DesktopNav />
          <MobileNavButton />
        </PlusGridRow>
      </PlusGrid>
      <MobileNav />
    </Disclosure>
  )
}