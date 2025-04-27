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
import LayoutSideBarElements from "./LayoutSideBarElements";
import { useParams } from "next/navigation";
import Configuration from "./configurations/Configuration";
import { Button } from "@/components/ui/button";
import { getProjectSubdomainUrl } from "@/lib/subdomain";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Chat from "@/components/ChatModel";

function LayoutSideBar() {
  const params = useParams();
  const visitProjectSubdomain = (projectId: string) => {
    const subdomainUrl = getProjectSubdomainUrl(projectId);
    window.open(subdomainUrl, "_blank");
  };

  return (
    <Sidebar side="right">
      <SidebarContent>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="sidebar-layout">
                Layout
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <LayoutSideBarElements />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel asChild>
              <CollapsibleTrigger className="config-components">
                Configuration
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <Configuration />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="secondary" className="w-full">
                  Export code
                </Button>
              </DrawerTrigger>
              <DrawerPortal>
                <DrawerContent className="h-full">
                  <DrawerHeader>
                    <DrawerTitle>Generate Code</DrawerTitle>
                    <DrawerDescription>
                      Generate code from your project elements in different
                      formats
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="px-4 py-2 flex-1 overflow-hidden">
                    <Chat />
                  </div>
                  <DrawerFooter>
                    <DrawerClose asChild>
                      <Button variant="outline">Close</Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </DrawerPortal>
            </Drawer>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Button
              onClick={() => {
                if (params.slug) visitProjectSubdomain(params.slug.toString());
              }}
              className="w-full bg-purple-400 font-bold"
              variant="outline"
            >
              View Live Site
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

export default LayoutSideBar;
