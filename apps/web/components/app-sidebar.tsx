"use client";

import * as React from "react";
import {
  BookOpenIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  CommandLineIcon,
  FolderIcon,
  LifebuoyIcon,
  PaperAirplaneIcon,
  ChartBarSquareIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/outline";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import { OrgSwitcher } from "@/components/org-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Main navigation items
const navMain = [
  { title: "Dashboard", url: "/app", icon: CommandLineIcon, isActive: true },
  {
    title: "Pages",
    url: "#",
    icon: DocumentTextIcon,
    items: [
      {
        title: "All Pages",
        url: "/app/pages",
      },
      {
        title: "Add New",
        url: "/app/pages/new",
      },
      {
        title: "Categories",
        url: "/app/pages/categories",
      },
    ],
  },
  {
    title: "SEO Tools",
    url: "#",
    icon: WrenchScrewdriverIcon,
    items: [
      {
        title: "Audit",
        url: "/app/audit",
      },
      {
        title: "Metadata",
        url: "/app/metadata",
      },
      {
        title: "Schema.org",
        url: "/app/schema",
      },
      {
        title: "Sitemap",
        url: "/app/sitemap",
      },
    ],
  },
  {
    title: "Accessibility",
    url: "#",
    icon: ShieldCheckIcon,
    items: [
      {
        title: "Screen Reader Test",
        url: "/app/accessibility/screen-reader",
      },
      {
        title: "Contrast Checker",
        url: "/app/accessibility/contrast",
      },
      {
        title: "WCAG Compliance",
        url: "/app/accessibility/wcag",
      },
    ],
  },
  {
    title: "Documentation",
    url: "#",
    icon: BookOpenIcon,
    items: [
      {
        title: "Getting Started",
        url: "/app/docs/getting-started",
      },
      {
        title: "API Reference",
        url: "/app/docs/api",
      },
      {
        title: "Examples",
        url: "/app/examples",
      },
      {
        title: "Changelog",
        url: "/app/docs/changelog",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Cog6ToothIcon,
    items: [
      {
        title: "General",
        url: "/app/settings",
      },
      {
        title: "Team",
        url: "/app/settings/team",
      },
      {
        title: "Billing",
        url: "/app/settings/billing",
      },
      {
        title: "API Keys",
        url: "/app/settings/api-keys",
      },
    ],
  },
];

// Project items
const projects = [
  {
    name: "Marketing Site",
    url: "/app/projects/marketing",
    icon: FolderIcon,
  },
  {
    name: "Blog",
    url: "/app/projects/blog",
    icon: FolderIcon,
  },
  {
    name: "E-commerce",
    url: "/app/projects/ecommerce",
    icon: FolderIcon,
  },
];

// Secondary navigation items
const navSecondary = [
  {
    title: "Support",
    url: "/app/support",
    icon: LifebuoyIcon,
  },
  {
    title: "Feedback",
    url: "/app/feedback",
    icon: PaperAirplaneIcon,
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      aria-label="Primary navigation"
      variant="inset"
      collapsible="icon"
      {...props}
    >
      <SidebarHeader>
        <OrgSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
        <NavProjects projects={projects} />
        <NavSecondary items={navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
