import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/lib/context";
import { EditorElement } from "@/lib/type";

type Props = {
  selectedElement: EditorElement | undefined;
};

const TextColorInput = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const [color, setColor] = useState("#000000");
  const [colorText, setColorText] = useState("#000000");

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setColor(newColor);
    setColorText(newColor);
    updateElementColor(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColorText(value);

    if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
      setColor(value);
      updateElementColor(value);
    }
  };

  const updateElementColor = (color: string) => {
    if (!selectedElement) return;

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            color: color,
          },
        },
      },
    });
  };

  React.useEffect(() => {
    if (selectedElement) {
      const color = selectedElement.styles?.color || "#000000";
      setColor(color);
      setColorText(color);
    }
  }, [selectedElement]);
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Input
          id="colorPicker"
          type="color"
          value={color}
          onChange={handleColorChange}
          className="w-12 h-8 "
        />
        <Input
          type="text"
          value={colorText}
          onChange={handleTextChange}
          placeholder="#000000"
          className=""
        />
      </div>
      <label>Text color</label>
    </div>
  );
};

export default TextColorInput;
