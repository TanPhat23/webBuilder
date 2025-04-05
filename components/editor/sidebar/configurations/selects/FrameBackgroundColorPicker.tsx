import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FrameBackgroundColorPicker = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useOptimisticElement();

  const backgroundColor = selectedElement?.styles?.backgroundColor || "";

  const handleBackgroundColorChange = (value: string) => {
    if (!selectedElement) return;

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          backgroundColor: value,
        },
      });
    });
  };

  const commonColors = [
    { name: "White", value: "#ffffff" },
    { name: "Light Gray", value: "#f9fafb" },
    { name: "Gray", value: "#d1d5db" },
    { name: "Dark Gray", value: "#4b5563" },
    { name: "Black", value: "#000000" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f97316" },
    { name: "Yellow", value: "#eab308" },
    { name: "Green", value: "#22c55e" },
    { name: "Blue", value: "#3b82f6" },
    { name: "Purple", value: "#a855f7" },
    { name: "Pink", value: "#ec4899" },
  ];

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs text-muted-foreground">Background Color</Label>
      <div className="flex gap-2 items-center">
        <Popover>
          <PopoverTrigger asChild>
            <div
              className="w-8 h-8 rounded border cursor-pointer"
              style={{ backgroundColor: backgroundColor || "transparent" }}
            />
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="grid grid-cols-6 gap-2">
              {commonColors.map((color) => (
                <div
                  key={color.value}
                  className="w-8 h-8 rounded border cursor-pointer"
                  style={{ backgroundColor: color.value }}
                  onClick={() => handleBackgroundColorChange(color.value)}
                  title={color.name}
                />
              ))}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Input
                type="color"
                value={backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                className="w-8 h-8 p-0 border"
              />
              <Input
                value={backgroundColor}
                onChange={(e) => handleBackgroundColorChange(e.target.value)}
                placeholder="#RRGGBB"
                className="h-8 flex-1"
              />
            </div>
          </PopoverContent>
        </Popover>
        <Input
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
          placeholder="transparent"
          className="h-8 flex-1"
        />
      </div>
    </div>
  );
};

export default FrameBackgroundColorPicker;
