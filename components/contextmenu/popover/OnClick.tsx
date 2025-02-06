import React from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Check, ChevronsUpDown } from "lucide-react";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ButtonElement, Element } from "@/lib/type";

const OnClick = () => {
  const [open, setOpen] = React.useState(false);
  const [number, setNumber] = React.useState(1);
  const { selectedElement } = useEditorContextProvider();
  const [selectedComboboxElement, setSelectedComboboxElement] =
    React.useState<Element | null>(null);
  const { elements, dispatch } = useEditorContext();

  const handleSelect = (selectedElement: Element) => {
    setSelectedComboboxElement(selectedElement);
  };

  const clickEvent = () => {
    if (selectedComboboxElement) {
      const el = document.getElementById(selectedComboboxElement.id);
      const num = number;
      if (el) {
        try {
          const currentValue = parseInt(el.innerText);
          el.innerText = `${currentValue + num}`;

          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              id: selectedComboboxElement.id,
              updates: {
                content: `${currentValue + num}`,
              },
            },
          });
        } catch (e) {
          console.error("Error updating element content:", e);
        }
      }
    }
  };

  const addEvent = () => {
    if (!selectedElement || !selectedComboboxElement) {
      console.error("No selected element or combobox element");
      return;
    }

    const buttonElement = selectedElement as ButtonElement;

    const eventData = {
      selectedElementId: selectedElement.id,
      selectedComboboxElementId: selectedComboboxElement.id,
      number,
    };
    localStorage.setItem("onClickEvent", JSON.stringify(eventData));

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: buttonElement.id,
        updates: {
          events: {
            ...buttonElement.events,
            onClick: clickEvent,
          },
        },
      },
    });
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="z-50 w-full hover:cursor-pointer bg-primary p-2 rounded-lg gap-2"
      >
        <Button className="hover:bg-blue-400">OnClick</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[280px] justify-between"
            >
              {selectedComboboxElement?.id || "Select an element"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 p-0">
            <Command>
              <CommandInput placeholder="Search element..." />
              <CommandList>
                <CommandEmpty>No element found.</CommandEmpty>
                <CommandGroup>
                  {elements.map((element) => (
                    <CommandItem
                      key={element.id}
                      value={element.id}
                      onSelect={() => {
                        handleSelect(element);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedComboboxElement?.id === element.id
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {element.id}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          value={number}
          onChange={(e) => setNumber(parseInt(e.target.value))}
          onDoubleClick={(e) => e.stopPropagation()}
        />
        <div className="grid gap-4 mt-4">
          <Button onClick={addEvent}>Add event</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OnClick;
