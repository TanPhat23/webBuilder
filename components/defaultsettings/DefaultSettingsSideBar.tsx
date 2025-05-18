"use client";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { ChevronDown } from "lucide-react";
import React from "react";
import CanvasConfiguration from "../editor/sidebar/configurations/CanvasConfiguration"; 

function DefaultSettingsSideBar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <Collapsible className="group/collapsible" defaultOpen={true}>
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="config-components">
                Default Settings
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <CanvasConfiguration />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem></SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default DefaultSettingsSideBar;
