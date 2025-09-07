"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavUser() {
  const { user } = useUser();
  const { state } = useSidebar();

  if (!user) return null;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-8 w-8 rounded-lg",
                userButtonTrigger: "focus:shadow-none",
              },
            }}
          />
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {user.firstName} {user.lastName}
            </span>
            <span className="truncate text-xs">
              {user.primaryEmailAddress?.emailAddress}
            </span>
          </div>
          {state !== "collapsed" && (
            <ChevronUpDownIcon className="ml-auto size-4" />
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
