"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

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

export const SearchCombobox: React.FC = () => {
  return (
    <Command>
      <CommandInput placeholder="Search framework..." />
      <CommandList>
        <CommandEmpty>No framework found.</CommandEmpty>
        <CommandGroup>
          {placeHolderComponents.map((framework) => (
            <CommandItem
              key={framework.label}
              value={framework.label}
            >
              {framework.component}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
};
