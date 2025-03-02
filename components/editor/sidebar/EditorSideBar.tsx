"use client";
import {
  Sidebar,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import TextHolder from "./sidebarcomponentholders/TextHolder";
import LinkHolder from "./sidebarcomponentholders/LinkHolder";
import ButtonHolder from "./sidebarcomponentholders/ButtonHolder";
import FrameHolder from "./sidebarcomponentholders/FrameHolder";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import ImageUpload from "./ImageUpload";
import Configuration from "./Configuration";
type Component = {
  component: React.ReactNode;
  label?: string;
};

const placeHolderComponents: Component[] = [
  {
    component: <TextHolder />,
    label: "Text",
  },
  {
    component: <LinkHolder />,
    label: "Link",
  },
  {
    component: <ButtonHolder />,
    label: "Button",
  },
  {
    component: <FrameHolder />,
    label: "Frame",
  },
];

export function EditorSideBar2() {
  return (
    <Sidebar side="left">
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Components
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <div className="grid grid-cols-3 transition ease-linear duration-1000">
                {placeHolderComponents.map((component, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center space-y border-black border-2 h-[75px] w-[75px] m-2 rounded-lg text-center text-sm"
                    >
                      <div className="hover:cursor-pointer">
                        {component.component}
                      </div>
                      <div>{component.label}</div>
                    </div>
                ))}
              </div>
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
              Image uploads
              <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
            </CollapsibleTrigger>
          </SidebarGroupLabel>
          <CollapsibleContent>
            <SidebarGroupContent>
              <ImageUpload />
            </SidebarGroupContent>
          </CollapsibleContent>
        </SidebarGroup>
      </Collapsible>
      <Collapsible defaultOpen className="group/collapsible">
        <SidebarGroup>
          <SidebarGroupLabel asChild>
            <CollapsibleTrigger>
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
    </Sidebar>
  );
}
