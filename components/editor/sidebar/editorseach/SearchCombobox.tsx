"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Component, ChevronDown } from "lucide-react";
import { useState } from "react";
import { CustomComponent } from "@/lib/styleconstants";

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
    label : "Carousel",
  },
];
const onDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  elementType: string | undefined
) => {
  if (elementType) e.dataTransfer.setData("customElement", elementType);
};

export const SearchCombobox: React.FC = () => {
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (groupName: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupName]: !prev[groupName],
    }));
  };

  const groupedComponents = customComponents.reduce((groups, component) => {
    const groupName = component.component.name?.match(/^[a-zA-Z]+/)?.[0] || "Others";
    if (!groups[groupName]) groups[groupName] = [];
    groups[groupName].push(component);
    return groups;
  }, {} as Record<string, CustomComponent[]>);

  return (
    <Command>
      <CommandInput placeholder="Search components..." />
      <CommandList>
        <CommandGroup>
          {placeHolderComponents.map((framework) => (
            <CommandItem key={framework.label} value={framework.label}>
              {framework.component}
            </CommandItem>
          ))}
          {Object.entries(groupedComponents).map(([groupName, components]) => (
            <div key={groupName} className="mb-4 border border-gray-100 rounded-md overflow-hidden">
              <div
                className="cursor-pointer font-medium text-sm px-3 py-2 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
                onClick={() => toggleGroup(groupName)}
              >
                <span className="text-gray-700">{groupName}</span>
                <ChevronDown 
                  className={`h-4 w-4 text-gray-500 transition-transform duration-200 ${
                    openGroups[groupName] ? 'transform rotate-180' : ''
                  }`} 
                />
              </div>
              {openGroups[groupName] && (
                <div className="bg-white">
                  {components.map((component) => (
                    <div
                      key={component.component.name || component.component.id}
                      className="flex justify-between items-center w-full px-3 py-2 hover:bg-gray-50 transition-colors duration-150 cursor-grab"
                      draggable
                      onDragStart={(e) =>
                        onDragStart(e, component.component.name)
                      }
                    >
                      <div className="text-sm text-gray-600">{component.component.name}</div>
                      <Component className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
