"use client";

import { OrganizationSwitcher } from "@clerk/nextjs";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function OrgSwitcher() {
  const { state } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          {state === "collapsed" ? (
            <OrganizationSwitcher
              hidePersonal
              appearance={{
                elements: {
                  rootBox: "flex",
                  organizationSwitcherTrigger:
                    "flex items-center justify-center rounded-lg p-0",
                  organizationPreviewAvatarBox: "size-8",
                  organizationSwitcherTriggerIcon: "hidden",
                },
              }}
            />
          ) : (
            <>
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <BuildingOfficeIcon className="size-4" />
              </div>
              <div className="flex-1 [&>div]:w-full">
                <OrganizationSwitcher
                  hidePersonal
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      organizationSwitcherTrigger:
                        "w-full flex items-center justify-between px-0 py-0 bg-transparent border-0 hover:bg-transparent",
                      organizationPreviewMainIdentifier:
                        "text-sm font-semibold text-left",
                      organizationSwitcherTriggerIcon: "ml-auto size-4",
                      organizationPreviewAvatarBox: "hidden",
                    },
                  }}
                />
              </div>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
