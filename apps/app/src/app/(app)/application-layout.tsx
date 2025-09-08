'use client'

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
} from '@clerk/nextjs'
import { getLandingUrl } from '@/lib/config'
import {
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
            <OrganizationSwitcher
              hidePersonal
              afterCreateOrganizationUrl="/org/:slug"
              afterSelectOrganizationUrl="/org/:slug"
              afterLeaveOrganizationUrl="/"
              appearance={{
                elements: {
                  rootBox: {
                    width: '100%',
                  },
                  organizationSwitcherTrigger: {
                    width: '100%',
                    padding: '0.5rem',
                    justifyContent: 'space-between',
                    borderRadius: '0.5rem',
                    '&:hover': {
                      backgroundColor: 'rgba(9, 9, 11, 0.05)',
                    },
                    '@media (prefers-color-scheme: dark)': {
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      },
                    },
                  },
                  organizationSwitcherTriggerIcon: {
                    marginLeft: 'auto',
                  },
                  organizationPreview: {
                    flex: '1',
                    width: '100%',
                  },
                },
              }}
            />
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/" current={pathname === '/'}>
                <HomeIcon />
                <SidebarLabel>Dashboard</SidebarLabel>
              </SidebarItem>
              <SidebarItem href="/websites" current={pathname.startsWith('/websites')}>
                <DocumentTextIcon />
                <SidebarLabel>Websites</SidebarLabel>
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
              <SidebarItem href="/websites/new">
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
            <UserButton
              showName={true}
              appearance={{
                elements: {
                  rootBox: {
                    width: '100%',
                  },
                  userButtonTrigger: {
                    width: '100%',
                    padding: '0.25rem',
                    borderRadius: '0.5rem',
                  },
                  userButtonBox: {
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.25rem',
                  },
                  userButtonOuterIdentifier: {
                    flex: '1 1 0%',
                    textAlign: 'left',
                    minWidth: '0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    fontSize: '0.875rem',
                    lineHeight: '1.25rem',
                    fontWeight: '500',
                  },
                  userButtonAvatarBox: {
                    width: '2.5rem',
                    height: '2.5rem',
                    flexShrink: '0',
                  },
                },
              }}
            />
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
