"use client"

import * as React from "react"

import { NavMain } from "@/components/shared/dashboard/nav-main"
import { NavUser } from "@/components/shared/dashboard/nav-user"
import { TeamSwitcher } from "@/components/shared/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, LayoutDashboardIcon, WalletIcon, TrophyIcon } from "lucide-react"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Tổng quan",
      url: "/admin/dashboard",
      icon: (
        <LayoutDashboardIcon
        />
      ),
      isActive: true,
    },
    {
      title: "Quản lý tài chính",
      url: "/admin/finance",
      icon: (
        <WalletIcon
        />
      ),
    },
    {
      title: "Leader board",
      url: "/admin/leaderboard",
      icon: (
        <TrophyIcon
        />
      ),
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="icon"
      {...props}
    >
      <SidebarHeader className="px-4 pt-4 pb-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:py-4">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter className="px-4 py-4 group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:px-1.5 group-data-[collapsible=icon]:py-4">
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
