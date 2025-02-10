import React, { useEffect } from "react";
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
  const { selectedElement } = useEditorContextProvider();
  React.useState<Element | null>(null);
  const { elements, dispatch } = useEditorContext();
  const [backColor, setBackColor] = React.useState<string>("#000000");
  const [textColor, setTextColor] = React.useState<string>("#000000");

  const prevBackColor = selectedElement?.styles?.backgroundColor || "#FFFFFF";
  const prevTextColor = selectedElement?.styles?.color || "#000000";

  const mouseHoverEvent = () => {
    if (selectedElement) {
      const el = document.getElementById(selectedElement.id);
      el?.addEventListener("mouseover", function () {
        el.style.backgroundColor = backColor;
        el.style.color = textColor;
      });
      el?.addEventListener("mouseout", function () {
        prevBackColor
          ? (el.style.backgroundColor = prevBackColor)
          : (el.style.backgroundColor = "");
        prevTextColor
          ? (el.style.color = prevTextColor)
          : (el.style.color = "");
      });
    }
  };
  const handleBackColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackColor(newColor);
  };

  const handleBackColorTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setBackColor(value);
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
  };

  const handleTextColorTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setTextColor(value);
  };

  useEffect(() => {
    setBackColor(prevBackColor);
    setTextColor(prevTextColor);
  }, []);

  const addEvent = () => {
    if (!selectedElement) return;
    const buttonElement = selectedElement as ButtonElement;

    const eventData = {
      selectedElementId: selectedElement.id,
      backColor: backColor,
      textColor: textColor,
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
        <div className="flex flex-col gap-2">
          <div className="flex flex-row gap-2">
            <Input
              id="colorPicker"
              type="color"
              value={backColor}
              onChange={handleBackColorChange}
              className="w-14 rounded-xl"
            />
            <Input
              type="text"
              value={backColor}
              onChange={handleBackColorTextChange}
              placeholder="#000000"
              className=""
            />
          </div>
          <label>Background color</label>
          <div className="flex flex-row gap-2">
            <Input
              id="colorPicker"
              type="color"
              value={textColor}
              onChange={handleTextColorChange}
              className="w-14 rounded-xl"
            />
            <Input
              type="text"
              value={textColor}
              onChange={handleTextColorTextChange}
              placeholder="#000000"
              className=""
            />
          </div>
          <label>Text color</label>
        </div>
        <div className="grid gap-4 mt-4">
          <Button onClick={addEvent}>Add event</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default OnHover;
