"use client";

import * as React from "react";
import { ChevronDown, Component } from "lucide-react";
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
import {
  ADVANCED_COMPONENTS,
  BASIC_COMPONENTS,
  COMPONENT_CATEGORIES,
} from "@/lib/constants/componentsconstants";
import { createElements } from "@/utils/createElements";
import { useParams } from "next/navigation";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorElement } from "@/lib/type";

export const SearchCombobox: React.FC = () => {
  const { slug } = useParams();
  const { addElementOptimistically } = useEditorStore();
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

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("customElement", elementType);
    e.dataTransfer.effectAllowed = "copyMove";
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    elementType: string,  
    componentType: "basic" | "custom" | "advanced"
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (componentType === "basic") {
      createElements(
        elementType,
        0,
        0,
        slug as string,
        addElementOptimistically
      );
    } else {
      const customComponent = customComponents.find(
        (component) => component.component.name === elementType
      )?.component as EditorElement;
      if (customComponent) {
        React.startTransition(() => {
          addElementOptimistically(customComponent, slug as string);
        });
      }
    }
  };
  // Memoized filtered components to prevent unnecessary recalculations
  const filteredComponents = () => {
    return COMPONENT_CATEGORIES.reduce((acc, category) => {
      acc[category.id] = customComponents.filter((component) =>
        component?.component?.name?.startsWith(category.prefix)
      );
      return acc;
    }, {} as Record<string, typeof customComponents>);
  };

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
        <CommandGroup heading="Basic Components">
          {BASIC_COMPONENTS.map((component) => (
            <CommandItem
              key={component.type}
              value={component.label}
              className="cursor-grab active:cursor-grabbing"
              onDoubleClick={(e) =>
                handleDoubleClick(e, component.type, "basic")
              }
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
          {ADVANCED_COMPONENTS.map((component) => (
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

        {COMPONENT_CATEGORIES.map((category) => (
          <Collapsible
            key={category.id}
            open={openSections[category.id]}
            onOpenChange={() => toggleSection(category.id)}
          >
            <CollapsibleTrigger className="w-full px-4 py-2 text-left  flex justify-between items-center">
              <span className="font-medium">{category.label}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform ${
                  openSections[category.id] ? "rotate-180" : ""
                }`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CommandGroup>
                {filteredComponents()[category.id]?.map((component) => (
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
                      onDoubleClick={(e) =>
                        handleDoubleClick(
                          e,
                          component.component.name ?? "",
                          "custom"
                        )
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
