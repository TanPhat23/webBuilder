import React, { startTransition, useState } from "react";
import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/lib/context";
import { EditorElement, Element } from "@/lib/type";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { start } from "repl";
type Props = {
  selectedElement: EditorElement | undefined;
};

const BackGroundColorInput = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const [color, setColor] = useState("#000000");
  const [backColor, setBackColor] = useState("#000000");

  const { optimisticElements, updateElementOptimistically } =
    useOptimisticElement();

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setBackColor(newColor);
    updateElementColor(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBackColor(value);

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColor(value);
      updateElementColor(value);
    }
  };

  const updateElementColor = (color: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          backgroundColor: color,
        },
      });
    });
  };

  React.useEffect(() => {
    if (selectedElement) {
      const color = selectedElement.styles?.backgroundColor || "#000000";
      setColor(color);
      setBackColor(color);
    }
  }, [selectedElement]);
  return (
    <div className="flex flex-col gap-1">
      <div className="flex flex-row gap-1 justify-center items-center">
        <Input
          id="colorPicker"
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-8 h-6 p-1"
        />
        <Input
          type="text"
          value={backColor}
          onChange={handleTextChange}
          placeholder="#000000"
          className=""
        />
      </div>
      <label className="text-xs">Background color</label>
    </div>
  );
};

export default BackGroundColorInput;
