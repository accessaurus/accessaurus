'use client'

import { usePathname } from 'next/navigation'
import {
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { Cog6ToothIcon, HomeIcon, QuestionMarkCircleIcon, SparklesIcon, Square2StackIcon, Cog8ToothIcon, PlusIcon } from '@heroicons/react/20/solid'

export function MainNavigation() {
  const pathname = usePathname()
  
  return (
    <SidebarSection>
      <SidebarItem href="/" current={pathname === '/'}>
        <HomeIcon />
        <SidebarLabel>Dashboard</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/sites" current={pathname.startsWith('/sites') || pathname.startsWith('/site/')}>
        <Square2StackIcon />
        <SidebarLabel>My Sites</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
        <Cog6ToothIcon />
        <SidebarLabel>Settings</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  )
}

export function QuickActionsNavigation() {
  return (
    <SidebarSection className="max-lg:hidden">
      <SidebarHeading>Quick Actions</SidebarHeading>
      <SidebarItem href="/sites/new">
        <PlusIcon />
        <SidebarLabel>Add New Site</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/api-keys">
        <Square2StackIcon />
        <SidebarLabel>API Keys</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/integrations">
        <Cog8ToothIcon />
        <SidebarLabel>Integrations</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  )
}

export function SupportNavigation() {
  return (
    <SidebarSection>
      <SidebarItem href="/support">
        <QuestionMarkCircleIcon />
        <SidebarLabel>Support</SidebarLabel>
      </SidebarItem>
      <SidebarItem href="/changelog">
        <SparklesIcon />
        <SidebarLabel>Changelog</SidebarLabel>
      </SidebarItem>
    </SidebarSection>
  )
}

import clsx from 'clsx'
import { SidebarHeading } from '@/components/sidebar'
