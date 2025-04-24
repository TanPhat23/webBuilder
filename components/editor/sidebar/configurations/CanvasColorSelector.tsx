import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCanvasStore } from "@/lib/store/canvasStore";

const CanvasColorSelector = () => {
  const { backgroundColor, setBackgroundColor } = useCanvasStore();
  const [colorText, setColorText] = useState(backgroundColor);

  useEffect(() => {
    setColorText(backgroundColor);
  }, [backgroundColor]);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColorText(newColor);
    setBackgroundColor(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorText(value);

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setBackgroundColor(value);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2 border rounded-md mb-4">
      <Label className="text-sm font-medium">Canvas Background</Label>
      <div className="flex gap-2 items-center">
        <Input
          type="color"
          value={colorText}
          onChange={handleColorChange}
          className="w-8 h-8 p-0 border-none rounded-md cursor-pointer"
          style={{ backgroundColor: colorText }}
        />
        <Input
          value={colorText}
          onChange={handleTextChange}
          placeholder="#RRGGBB"
          className="h-8 flex-1"
        />
      </div>
    </div>
  );
};

export default CanvasColorSelector;
