'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import {
  UserButton,
  OrganizationSwitcher,
  useUser,
  useOrganization,
} from '@clerk/nextjs'
import { getLandingUrl } from '@/lib/config'
import {
  ChevronDownIcon,
  ChevronUpIcon,
  Cog8ToothIcon,
  PlusIcon,
} from '@heroicons/react/16/solid'
import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  Square2StackIcon,
} from '@heroicons/react/20/solid'
import { usePathname } from 'next/navigation'

export function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  let pathname = usePathname()
  const { user } = useUser()
  const { organization } = useOrganization()

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem>
              <UserButton afterSignOutUrl={getLandingUrl()} />
            </NavbarItem>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl="/org/:slug"
                afterSelectOrganizationUrl="/org/:slug"
                afterLeaveOrganizationUrl="/"
                appearance={{
                  elements: {
                    rootBox: "flex w-full",
                    organizationSwitcherTrigger: "w-full justify-between px-2 py-1.5 hover:bg-zinc-950/5 dark:hover:bg-white/5 rounded-lg",
                  },
                }}
              />
            </div>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/optimizations" current={pathname.startsWith('/optimizations')}>
                <DocumentTextIcon />
                <SidebarLabel>Page Optimizations</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/analytics" current={pathname.startsWith('/analytics')}>
                <ChartBarIcon />
                <SidebarLabel>Analytics</SidebarLabel>
              </SidebarItem>
              
              <SidebarItem href="/settings" current={pathname.startsWith('/settings')}>
                <Cog6ToothIcon />
                <SidebarLabel>Settings</SidebarLabel>
              </SidebarItem>
            </SidebarSection>

            <SidebarSection className="max-lg:hidden">
              <SidebarHeading>Quick Actions</SidebarHeading>
              <SidebarItem href="/new-optimization">
                <PlusIcon />
                <SidebarLabel>Add New Website</SidebarLabel>
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

            <SidebarSpacer />

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
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <div className="flex items-center gap-3 px-2 py-3">
              <UserButton 
                afterSignOutUrl={getLandingUrl()}
                appearance={{
                  elements: {
                    avatarBox: "size-10",
                  },
                }}
              />
              {user && (
                <div className="min-w-0">
                  <div className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                    {user.fullName || user.firstName || 'User'}
                  </div>
                  <div className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                    {organization?.name || user.primaryEmailAddress?.emailAddress}
                  </div>
                </div>
              )}
            </div>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
