import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { useEditorContext } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import React from "react";

type Props = {
  selectedElement: EditorElement | undefined;
};

const borderStyles = [
  "solid",
  "dashed",
  "dotted",
  "double",
  "groove",
  "ridge",
  "inset",
  "outset",
  "none",
  "hidden",
];

const BorderWeightPopover = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();

  const [borderWeight, setBorderWeight] = React.useState<number>(0);
  const [borderStyle, setBorderStyle] = React.useState<string>("solid");
  const [borderColor, setBorderColor] = React.useState<string>("black");

  const updateBorder = (weight: number, style: string, color: string) => {
    const newBorder = `${weight}px ${style} ${color}`;
    if (selectedElement) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: selectedElement.id,
          updates: {
            styles: {
              ...selectedElement.styles,
              border: newBorder,
            },
          },
        },
      });
    }
  };

  const handleSliderChange = (value: number[]) => {
    const newBorderWeight = value[0];
    setBorderWeight(newBorderWeight);
    updateBorder(newBorderWeight, borderStyle, borderColor);
  };

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBorderStyle = e.target.value;
    setBorderStyle(newBorderStyle);
    updateBorder(borderWeight, newBorderStyle, borderColor);
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBorderColor = e.target.value;
    setBorderColor(newBorderColor);
    updateBorder(borderWeight, borderStyle, newBorderColor);
  };

  React.useEffect(() => {
    if (selectedElement) {
      const initBorder =
        selectedElement.styles?.border?.toString() || "0px solid black";
      const [weight, style, color] = initBorder.split(" ");
      setBorderWeight(parseInt(weight) || 0);
      setBorderStyle(style || "solid");
      setBorderColor(color || "black");
    }
  }, [selectedElement]);

  return (
    <Popover>
      <PopoverTrigger asChild className="w-auto h-8">
        <Button className="bg-white text-black hover:bg-slate-200 text-xs border border-gray-300">
          Border Properties
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Border Weight
          </label>
          <Slider
            defaultValue={[borderWeight]}
            max={20}
            step={1}
            onValueChange={handleSliderChange}
            aria-label="Border weight slider"
          />
          <p className="text-sm mt-2">Weight: {borderWeight}px</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Border Style</label>
          <select
            value={borderStyle}
            onChange={handleStyleChange}
            className="w-full p-2 border rounded"
          >
            {borderStyles.map((style) => (
              <option key={style} value={style}>
                {style}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Border Color</label>
          <input
            type="color"
            value={borderColor}
            onChange={handleColorChange}
            className="w-full h-10"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default BorderWeightPopover;
