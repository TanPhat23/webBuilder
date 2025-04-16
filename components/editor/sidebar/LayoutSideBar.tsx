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
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import React from "react";
import LayoutSideBarElements from "./LayoutSideBarElements";
import { useParams, useRouter } from "next/navigation";
import Configuration from "./configurations/Configuration";
import { Button } from "@/components/ui/button";
import { getProjectSubdomainUrl } from "@/lib/subdomain";

type Props = {};

function LayoutSideBar({}: Props) {
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
