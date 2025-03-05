"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Clock,
  Command,
  GalleryVerticalEnd,
  MenuIcon,
  Settings2,
  ArchiveRestoreIcon,
} from "lucide-react"
import { useUser } from "@clerk/nextjs"

import { NavMain } from "@/components/dashboard/nav-main"
import { NavProjects } from "@/components/dashboard/nav-projects"
import { NavUser } from "@/components/dashboard/nav-user"
import { TeamSwitcher } from "@/components/dashboard/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Models",
      url: "#",
      icon: Bot
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Recents",
      url: "#",
      icon: Clock,
      type: "recent",
    },
    {
      name: "All Projects",
      url: "#",
      icon: MenuIcon,
      type: "all",
    },
    {
      name: "Important",
      url: "#",
      icon: ArchiveRestoreIcon,
      type: "important",
    },
  ],
  projectItems: [
    {
      id: "1",
      name: "Landing Page",
      url: "/projects/landing-page",
      lastModified: new Date(2023, 6, 25, 14, 30),
      isImportant: false,
    },
    {
      id: "2",
      name: "E-commerce Store",
      url: "/projects/ecommerce",
      lastModified: new Date(2023, 6, 28, 9, 15),
      isImportant: true,
    },
    {
      id: "3",
      name: "Portfolio Site",
      url: "/projects/portfolio",
      lastModified: new Date(2023, 6, 27, 16, 45),
      isImportant: false,
    },
    {
      id: "4",
      name: "Blog Template",
      url: "/projects/blog",
      lastModified: new Date(2023, 6, 29, 11, 20),
      isImportant: true,
    },
    {
      id: "5",
      name: "Dashboard UI",
      url: "/projects/dashboard",
      lastModified: new Date(2023, 6, 26, 10, 0),
      isImportant: false,
    }
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, isLoaded } = useUser();
  
  const userData = isLoaded ? {
    name: user?.fullName || user?.username || "User",
    email: user?.primaryEmailAddress?.emailAddress || "",
    avatar: user?.imageUrl || "/avatars/default.jpg",
  } : {
    name: "Loading...",
    email: "",
    avatar: "/avatars/default.jpg",
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="flex flex-col items-center">
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} projectItems={data.projectItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
