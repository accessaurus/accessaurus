import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarSpacer,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'
import {
  UserButton,
  OrganizationSwitcher,
  ClerkLoading,
  ClerkLoaded,
} from '@clerk/nextjs'
import { getLandingUrl } from '@/lib/config'
import { MainNavigation, QuickActionsNavigation, SupportNavigation } from '@/components/sidebar-navigation'

export function ApplicationLayout({
  children,
}: {
  children: React.ReactNode
}) {

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
            <ClerkLoading>
              <div className="flex items-center gap-3 p-2 w-full">
                <div className="h-4 w-4 rounded-lg bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-3/4" />
                </div>
              </div>
            </ClerkLoading>
            <ClerkLoaded>
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
            </ClerkLoaded>
          </SidebarHeader>

          <SidebarBody>
            <MainNavigation />
            <QuickActionsNavigation />
            <SidebarSpacer />
            <SupportNavigation />
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">
            <ClerkLoading>
              <div className="flex items-center gap-3 p-1 w-full">
                <div className="flex-1 space-y-2">
                  <div className="h-3 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-2/3" />
                  <div className="h-2 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse w-1/2" />
                </div>
                <div className="h-10 w-10 rounded-full bg-zinc-200 dark:bg-zinc-700 animate-pulse" />
              </div>
            </ClerkLoading>
            <ClerkLoaded>
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
                      '&:hover': {
                        backgroundColor: 'rgba(9, 9, 11, 0.05)',
                      },
                      '@media (prefers-color-scheme: dark)': {
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      },
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
            </ClerkLoaded>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
