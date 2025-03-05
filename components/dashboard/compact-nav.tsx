"use client"

import * as React from "react"
import {
  BadgeCheck,
  Bell,
  ChevronRight,
  ChevronsUpDown,
  CreditCard,
  Folder,
  Forward,
  LogOut,
  MoreHorizontal,
  Plus,
  Sparkles,
  Trash2,
  type LucideIcon,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"

export const CompactNav = {
  TeamSwitcher: ({ teams }: {
    teams: {
      name: string
      logo: React.ElementType
      plan: string
    }[]
  }) => {
    const { isMobile } = useSidebar()
    const [activeTeam, setActiveTeam] = React.useState(teams[0])

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="sm"
                className="data-[state=open]:bg-sidebar-accent"
              >
                <div className="flex aspect-square size-6 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground">
                  <activeTeam.logo className="size-3" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">{activeTeam.name}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-3" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-52 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">Teams</DropdownMenuLabel>
              {teams.map((team, index) => (
                <DropdownMenuItem
                  key={team.name}
                  onClick={() => setActiveTeam(team)}
                  className="gap-2 py-1.5"
                >
                  <div className="flex size-5 items-center justify-center rounded-sm border">
                    <team.logo className="size-3" />
                  </div>
                  {team.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="gap-2 py-1.5">
                <div className="flex size-5 items-center justify-center rounded-sm border">
                  <Plus className="size-3" />
                </div>
                <div className="text-muted-foreground">Add team</div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  },

  Main: ({ items }: {
    items: {
      title: string
      url: string
      icon?: LucideIcon
      isActive?: boolean
      items?: {
        title: string
        url: string
      }[]
    }[]
  }) => {
    return (
      <SidebarGroup>
        <SidebarGroupLabel className="text-xs">Platform</SidebarGroupLabel>
        <SidebarMenu className="gap-0.5">
          {items.map((item) => (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title} size="sm">
                    {item.icon && <item.icon className="size-4" />}
                    <span className="text-xs">{item.title}</span>
                    <ChevronRight className="ml-auto size-3 transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton asChild className="text-xs py-1">
                          <a href={subItem.url}>
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    )
  },

  Projects: ({ projects }: {
    projects: {
      name: string
      url: string
      icon: LucideIcon
    }[]
  }) => {
    const { isMobile } = useSidebar()

    return (
      <SidebarGroup className="group-data-[collapsible=icon]:hidden mt-1">
        <SidebarGroupLabel className="text-xs">Projects</SidebarGroupLabel>
        <SidebarMenu className="gap-0.5">
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon className="size-4" />
                  <span className="text-xs">{item.name}</span>
                </a>
              </SidebarMenuButton>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuAction showOnHover>
                    <MoreHorizontal className="size-3" />
                    <span className="sr-only">More</span>
                  </SidebarMenuAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-44 rounded-lg"
                  side={isMobile ? "bottom" : "right"}
                  align={isMobile ? "end" : "start"}
                >
                  <DropdownMenuItem className="py-1.5">
                    <Folder className="mr-2 size-3.5 text-muted-foreground" />
                    <span className="text-xs">View Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="py-1.5">
                    <Forward className="mr-2 size-3.5 text-muted-foreground" />
                    <span className="text-xs">Share Project</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="py-1.5">
                    <Trash2 className="mr-2 size-3.5 text-muted-foreground" />
                    <span className="text-xs">Delete Project</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroup>
    )
  },

  User: ({ user }: {
    user: {
      name: string
      email: string
      avatar: string
    }
  }) => {
    const { isMobile } = useSidebar()

    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="sm"
                className="data-[state=open]:bg-sidebar-accent"
              >
                <Avatar className="size-6 rounded-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-md text-xs">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-3" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-48 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuItem className="py-1.5 px-2">
                <Avatar className="mr-2 size-6 rounded-md">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-md text-xs">CN</AvatarFallback>
                </Avatar>
                <div className="text-xs">{user.email}</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-1.5">
                  <Sparkles className="mr-2 size-3.5" />
                  <span className="text-xs">Upgrade to Pro</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem className="py-1.5">
                  <BadgeCheck className="mr-2 size-3.5" />
                  <span className="text-xs">Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1.5">
                  <CreditCard className="mr-2 size-3.5" />
                  <span className="text-xs">Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem className="py-1.5">
                  <Bell className="mr-2 size-3.5" />
                  <span className="text-xs">Notifications</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-1.5">
                <LogOut className="mr-2 size-3.5" />
                <span className="text-xs">Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    )
  },
}
