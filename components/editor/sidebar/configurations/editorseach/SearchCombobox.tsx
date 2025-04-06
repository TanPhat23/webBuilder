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
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { customComponents } from "@/lib/customcomponents/styleconstants";

// Types
type DraggableComponent = {
  component: React.ReactNode;
  label: string;
  type: string;
};

type ComponentCategory = {
  id: string;
  label: string;
  prefix: string;
  defaultOpen?: boolean;
};

// Component imports (consider lazy loading for better performance)
const TextHolder = React.lazy(
  () => import("../../sidebarcomponentholders/TextHolder")
);
const LinkHolder = React.lazy(
  () => import("../../sidebarcomponentholders/LinkHolder")
);
const ButtonHolder = React.lazy(
  () => import("../../sidebarcomponentholders/ButtonHolder")
);
const FrameHolder = React.lazy(
  () => import("../../sidebarcomponentholders/FrameHolder")
);
const CarouselHolder = React.lazy(
  () => import("../../sidebarcomponentholders/CarouselHolder")
);

// Constants
const BASIC_COMPONENTS: DraggableComponent[] = [
  {
    component: <TextHolder />,
    label: "Text",
    type: "text",
  },
  {
    component: <LinkHolder />,
    label: "Link",
    type: "link",
  },
  {
    component: <ButtonHolder />,
    label: "Button",
    type: "button",
  },
  {
    component: <FrameHolder />,
    label: "Frame",
    type: "frame",
  },
  {
    component: <CarouselHolder />,
    label: "Carousel",
    type: "carousel",
  },
];

const COMPONENT_CATEGORIES: ComponentCategory[] = [
  {
    id: "navbar",
    label: "Navbar Components",
    prefix: "NavBar",
  },
  {
    id: "footer",
    label: "Footer Components",
    prefix: "Footer",
  },
  {
    id: "header",
    label: "Header Components",
    prefix: "Header",
  },
  {
    id: "sidebar",
    label: "Sidebar Components",
    prefix: "Sidebar",
  },
  {
    id: "teamMembers",
    label: "Team Members Components",
    prefix: "TeamMembers",
  },
  {
    id: "missionComponents",
    label: "Mission Components",
    prefix: "MissionComponent",
  },
];

const handleDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  elementType: string
) => {
  e.dataTransfer.setData("customElement", elementType);
  e.dataTransfer.effectAllowed = "copyMove";
};

export const SearchCombobox: React.FC = () => {
  // State for open sections with proper initialization
  const [openSections, setOpenSections] = React.useState<
    Record<string, boolean>
  >(
    COMPONENT_CATEGORIES.reduce(
      (acc, category) => ({
        ...acc,
        [category.id]: category.defaultOpen ?? false,
      }),
      {}
    )
  );

  // Memoized filtered components to prevent unnecessary recalculations
  const filteredComponents = () => {
    return COMPONENT_CATEGORIES.reduce((acc, category) => {
      acc[category.id] = customComponents.filter((component) =>
        component.component.name?.startsWith(category.prefix)
      );
      return acc;
    }, {} as Record<string, typeof customComponents>);
  }

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search components..." />
      <CommandList>
        {/* Basic Components Section */}
        <CommandGroup heading="Basic Components">
          {BASIC_COMPONENTS.map((component) => (
            <CommandItem
              key={component.type}
              value={component.label}
              className="cursor-grab active:cursor-grabbing"
            >
              <div
                draggable
                onDragStart={(e) => handleDragStart(e, component.type)}
                className="w-full"
              >
                <React.Suspense fallback={<div>Loading component...</div>}>
                  {component.component}
                </React.Suspense>
              </div>
            </CommandItem>
          ))}
        </CommandGroup>

        {/* Component Categories */}
        {COMPONENT_CATEGORIES.map((category) => (
          <Collapsible
            key={category.id}
            open={openSections[category.id]}
            onOpenChange={() => toggleSection(category.id)}
          >
            <CollapsibleTrigger className="w-full px-4 py-2 text-left hover:bg-gray-100 flex justify-between items-center">
              <span className="font-medium">{category.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections[category.id] ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CommandGroup>
                {filteredComponents()[category.id]?.map((component)  => (
                  <CommandItem
                    key={component.component.name}
                    value={component.component.name ?? ""}
                    className="cursor-grab active:cursor-grabbing"
                  >
                    <div
                      draggable
                      onDragStart={(e) =>
                        handleDragStart(e, component.component.name ?? "")
                      }
                      className="flex justify-between w-full"
                    >
                      <span>{component.component.name}</span>
                      <Component className="h-4 w-4 opacity-70" />
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CommandList>
    </Command>
  );
};
