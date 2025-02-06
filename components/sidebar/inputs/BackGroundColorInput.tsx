import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/lib/context";
import { Element } from "@/lib/type";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
};

const BackGroundColorInput = ({ selectedElement, selectedElements }: Props) => {
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

    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              backgroundColor: color,
            },
          },
        },
      });
    });
  };

  React.useEffect(() => {
    if (selectedElement) {
      const color = selectedElement.styles?.backgroundColor || "#000000";
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
          className="w-14 rounded-xl"
        />
        <Input
          type="text"
          value={colorText}
          onChange={handleTextChange}
          placeholder="#000000"
          className=""
        />
      </div>
      <label>Background color</label>
    </div>
  );
};

export default BackGroundColorInput;
