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

const OnHover = () => {
  const [number, setNumber] = React.useState(1);
  const { selectedElement } = useEditorContextProvider();
  React.useState<Element | null>(null);
  const { elements, dispatch } = useEditorContext();
  const [color, setColor] = React.useState<string>("");

  const mouseHoverEvent = () => {
    if (selectedElement) {
      const el = document.getElementById(selectedElement.id);
      const prevColor = el?.style.backgroundColor;
      el?.addEventListener("mouseover", function () {
        el.style.backgroundColor = color;
      });
      el?.addEventListener("mouseout", function () {
        prevColor
          ? (el.style.backgroundColor = prevColor)
          : (el.style.backgroundColor = "");
      });
    }
  };

  const addEvent = () => {
    if (!selectedElement) return;
    const buttonElement = selectedElement as ButtonElement;

    const eventData = {
      selectedElementId: selectedElement.id,
      number,
    };
    localStorage.setItem("onHoverEvent", JSON.stringify(eventData));

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: buttonElement.id,
        updates: {
          events: {
            ...buttonElement.events,
            onHover: mouseHoverEvent,
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
        <Button className="hover:bg-blue-400">OnHover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
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

export default OnHover;
