import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { startTransition, useEffect, useState } from "react";
import TextColorInput from "../inputs/TextColorInput";
import BackGroundColorInput from "../inputs/BackGroundColorInput";
import { EditorElement } from "@/lib/type";
import { Switch } from "@/components/ui/switch";
import * as CSS from "csstype";
import { loadFont } from "@/app/utils/LoadFont";
import { useCanvasStore } from "@/lib/store/canvasStore";
import { useEditorStore } from "@/lib/store/editorStore";
import useSWR from "swr";
import { getFontFamily } from "@/actions";

type Props = {
  selectedElement: EditorElement;
};

const Typography = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useEditorStore();
  const [localFontSize, setLocalFontSize] = useState<
    CSS.Property.FontSize | undefined
  >((selectedElement?.styles?.fontSize as CSS.Property.FontSize) || undefined);

  useEffect(() => {
    setLocalFontSize(
      (selectedElement?.styles?.fontSize as CSS.Property.FontSize) || undefined
    );
  }, [selectedElement]);
  const { data: fontFamilies = [] } = useSWR(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`,
    getFontFamily
  );
  const { canvasFontFamilies, setFontFamilies } = useCanvasStore();

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    const newFontSize = e.target.value as CSS.Property.FontSize;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          fontSize: newFontSize,
          transition: "font-size 0.2s ease",
        },
      });
    });
  };

  const handleNumberInput = (property: string, value: string) => {
    if (!selectedElement) return;

    let formattedValue = value;

    const needsPxSuffix = ["letterSpacing", "lineHeight"];

    if (needsPxSuffix.includes(property) && /^\d+$/.test(value)) {
      formattedValue = `${value}px`;
    }

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [property]: formattedValue,
        },
      });
    });
  };

  const handleSelectChange = (property: string, value: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [property]: value,
        },
      });
    });
  };

  const handleSwitchChange = (property: string, value: boolean) => {
    if (!selectedElement) return;

    let styleValue = "";
    if (property === "textDecoration") {
      styleValue = value ? "underline" : "none";
    } else if (property === "fontStyle") {
      styleValue = value ? "italic" : "normal";
    } else if (property === "fontWeight") {
      styleValue = value ? "bold" : "normal";
    }

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [property]: styleValue,
        },
      });
    });
  };

  return (
    <AccordionItem value="typography">
      <AccordionTrigger className="text-sm font-medium">
        Typography
      </AccordionTrigger>
      <AccordionContent>
        <div className="space-y-4">
          <div className="flex flex-row gap-1 flex-wrap">
            <div className="flex flex-col">
              <div className="flex flex-row gap-1">
                <Input
                  className="w-full max-w-[100px] text-xs p-1"
                  value={localFontSize}
                  onChange={handleFontChange}
                  placeholder="16px"
                />
              </div>
              <label className="text-xs">Font size</label>
            </div>

            <div className="flex flex-col flex-1">
              <Select
                value={selectedElement?.styles?.fontFamily || ""}
                onValueChange={(value) => {
                  handleSelectChange("fontFamily", value);
                  loadFont(value);
                  if (!canvasFontFamilies.includes(value)) {
                    setFontFamilies([...canvasFontFamilies, value]);
                  }
                }}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select font" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font: string) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <label className="text-xs">Font family</label>
            </div>
          </div>

          <div className="flex flex-row gap-1 mr-4">
            <div className="flex flex-col w-full">
              <Select
                value={selectedElement?.styles?.textAlign || "left"}
                onValueChange={(value) =>
                  handleSelectChange("textAlign", value)
                }
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Text align" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                  <SelectItem value="justify">Justify</SelectItem>
                </SelectContent>
              </Select>
              <label className="text-xs">Text align</label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="letterSpacing" className="w-1/3">
                Letter Spacing
              </Label>
              <Input
                id="letterSpacing"
                className="flex-1"
                value={selectedElement?.styles?.letterSpacing || ""}
                onChange={(e) =>
                  handleNumberInput("letterSpacing", e.target.value)
                }
                placeholder="e.g., 1px"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="lineHeight" className="w-1/3">
                Line Height
              </Label>
              <Input
                id="lineHeight"
                className="flex-1"
                value={selectedElement?.styles?.lineHeight || ""}
                onChange={(e) =>
                  handleNumberInput("lineHeight", e.target.value)
                }
                placeholder="e.g., 1.5"
              />
            </div>
          </div>

          <div className="flex flex-row mr-4 gap-1">
            <TextColorInput selectedElement={selectedElement} />
            <BackGroundColorInput selectedElement={selectedElement} />
          </div>

          <div className="space-y-2">
            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="underline">Underline</Label>
              <Switch
                id="underline"
                checked={
                  selectedElement?.styles?.textDecoration === "underline"
                }
                onCheckedChange={(checked) =>
                  handleSwitchChange("textDecoration", checked)
                }
              />
            </div>

            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="italic">Italic</Label>
              <Switch
                id="italic"
                checked={selectedElement?.styles?.fontStyle === "italic"}
                onCheckedChange={(checked) =>
                  handleSwitchChange("fontStyle", checked)
                }
              />
            </div>

            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="Bold">Bold</Label>
              <Switch
                id="Bold"
                checked={selectedElement?.styles?.fontWeight === "bold"}
                onCheckedChange={(checked) =>
                  handleSwitchChange("fontWeight", checked)
                }
              />
            </div>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};

export default Typography;
