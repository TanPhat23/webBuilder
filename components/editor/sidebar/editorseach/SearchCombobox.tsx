"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Component } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
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
];
const onDragStart = (
  e: React.DragEvent<HTMLDivElement>,
  elementType: string | undefined
) => {
  if (elementType) e.dataTransfer.setData("customElement", elementType);
};

export const SearchCombobox: React.FC = () => {
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
          {customComponents.map((components) => (
            <CommandItem
              onDrop={(e) => {}}
              key={components.component.name}
              value={components.component.name}
            >
              <div
                className="flex justify-between w-full"
                draggable
                onDragStart={(e) => onDragStart(e, components.component.name)}
              >
                <div>{components.component.name}</div>
                <Component />
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
