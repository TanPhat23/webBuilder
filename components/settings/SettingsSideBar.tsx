"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Settings } from "lucide-react"; // Changed from Link to Settings icon
import Link from "next/link"; // Added the correct Next.js Link component

export const SettingSideBar = () => {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/settings/preferences" className="w-full">
                <SidebarMenuButton>
                  <Settings className="h-4 w-4 mr-2" />
                  <span className="text-sm font-medium">Preferences</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
};
