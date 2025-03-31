"use client";

import * as React from "react";
import { Check, ChevronDown, Component } from "lucide-react";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import TextHolder from "../sidebarcomponentholders/TextHolder";
import LinkHolder from "../sidebarcomponentholders/LinkHolder";
import ButtonHolder from "../sidebarcomponentholders/ButtonHolder";
import FrameHolder from "../sidebarcomponentholders/FrameHolder";
import { customComponents } from "@/lib/styleconstants";
import CarouselHolder from "../sidebarcomponentholders/CarouselHolder";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

interface Component {
  component: React.ReactNode;
  label?: string;
}

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
  {
    component: <CarouselHolder />,
    label: "Carousel",
  },
];

const onDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  elementType: string | undefined
) => {
  if (elementType) e.dataTransfer.setData("customElement", elementType);
};

export const SearchCombobox: React.FC = () => {
  const [openSections, setOpenSections] = React.useState<Record<string, boolean>>({
    navbar: true,
    footer: true,
    header: true,
    sidebar: true,
    teamMembers: true,
    missionComponents: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const filterComponents = (prefix: string) =>
    customComponents.filter((component) =>
      component.component.name?.startsWith(prefix)
    );

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search components..." />
      <CommandList>
        <CommandGroup>
          {placeHolderComponents.map((framework) => (
            <CommandItem key={framework.label} value={framework.label}>
              <div
                className="w-full"
                draggable
                onDragStart={(e) => onDragStart(e, framework.label)}
              >
                {framework.component}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        <Collapsible open={openSections.navbar} onOpenChange={() => toggleSection("navbar")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Navbar Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.navbar ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("NavBar").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.footer} onOpenChange={() => toggleSection("footer")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Footer Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.footer ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("Footer").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.header} onOpenChange={() => toggleSection("header")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Header Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.header ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("Header").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.sidebar} onOpenChange={() => toggleSection("sidebar")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Sidebar Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.sidebar ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("Sidebar").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.teamMembers} onOpenChange={() => toggleSection("teamMembers")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Team Members Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.teamMembers ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("TeamMembers").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>

        <Collapsible open={openSections.missionComponents} onOpenChange={() => toggleSection("missionComponents")}>
          <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
            <span className="font-medium">Mission Components</span>
            <ChevronDown
              className={`h-4 w-4 transition-transform ${
                openSections.missionComponents ? "rotate-180" : ""
              }`}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CommandGroup>
              {filterComponents("MissionComponent").map((component) => (
                <CommandItem key={component.component.name} value={component.component.name}>
                  <div
                    className="flex justify-between w-full"
                    draggable
                    onDragStart={(e) => onDragStart(e, component.component.name)}
                  >
                    <div>{component.component.name}</div>
                    <Component className="h-4 w-4" />
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CollapsibleContent>
        </Collapsible>
      </CommandList>
    </Command>
  );
};