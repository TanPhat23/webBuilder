import React, { startTransition, useState, useEffect } from "react";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Slider } from "../../../ui/slider";
import { Switch } from "../../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../ui/accordion";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import TextColorInput from "./inputs/TextColorInput";
import BackGroundColorInput from "./inputs/BackGroundColorInput";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { EditorElement } from "@/lib/type";

type Props = {
  selectedElement: EditorElement;
  fontFamilies: string[];
};

const BaseConfiguration: React.FC<Props> = ({
  selectedElement,
  fontFamilies,
}) => {
  const [localFontSize, setLocalFontSize] = useState(
    selectedElement?.styles?.fontSize || ""
  );
  const { updateElementOptimistically } = useOptimisticElement();

  useEffect(() => {
    setLocalFontSize(selectedElement?.styles?.fontSize || "");
  }, [selectedElement]);

  const handleFontChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    const newFontSize = e.currentTarget.value;
    setLocalFontSize(newFontSize);
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

  const handleNumberInput = (property: string, value: string | number) => {
    if (!selectedElement) return;

    // Add 'px' if the user only entered a number
    let formattedValue = value;
    if (typeof value === "string" && /^\d+$/.test(value)) {
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

  const handleSwitchChange = (property: string, value: boolean) => {
    if (!selectedElement) return;

    let styleValue = value;
    // Handle specific cases
    if (property === "textDecoration") {
      styleValue == value ? "underline" : "none";
    } else if (property === "fontStyle") {
      styleValue == value ? "italic" : "normal";
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

  const handleOpacityChange = (value: number[]) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          opacity: value[0] / 100,
        },
      });
    });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["typography", "spacing", "border", "effects"]}
      className="w-full"
    >
      <AccordionItem value="typography">
        <AccordionTrigger className="text-sm font-medium">
          Typography
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex flex-row gap-1 flex-wrap">
              <div className="flex flex-col ">
                <div className="flex flex-row gap-1">
                  <Input
                    className="w-full max-w-[100px] text-xs p-1"
                    value={localFontSize}
                    onChange={handleFontChange}
                  />
                  <FontSizeComboBox selectedElement={selectedElement} />
                </div>
                <label className="text-xs">Font size</label>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <FontFamilyComboBox
                  selectedElement={selectedElement}
                  fontFamilies={fontFamilies}
                />
                <label className="text-xs">Font Family</label>
              </div>
            </div>

            <div className="flex flex-row gap-1 mr-4">
              <TextAlignButton selectedElement={selectedElement} />
              <TextStyleButtons selectedElement={selectedElement} />
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
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing">
        <AccordionTrigger className="text-sm font-medium">
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Margin</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="marginTop" className="text-xs">
                      Top
                    </Label>
                    <Input
                      id="marginTop"
                      className="mt-1"
                      value={selectedElement?.styles?.marginTop || ""}
                      onChange={(e) =>
                        handleNumberInput("marginTop", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginRight" className="text-xs">
                      Right
                    </Label>
                    <Input
                      id="marginRight"
                      className="mt-1"
                      value={selectedElement?.styles?.marginRight || ""}
                      onChange={(e) =>
                        handleNumberInput("marginRight", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginBottom" className="text-xs">
                      Bottom
                    </Label>
                    <Input
                      id="marginBottom"
                      className="mt-1"
                      value={selectedElement?.styles?.marginBottom || ""}
                      onChange={(e) =>
                        handleNumberInput("marginBottom", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="marginLeft" className="text-xs">
                      Left
                    </Label>
                    <Input
                      id="marginLeft"
                      className="mt-1"
                      value={selectedElement?.styles?.marginLeft || ""}
                      onChange={(e) =>
                        handleNumberInput("marginLeft", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Padding</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="paddingTop" className="text-xs">
                      Top
                    </Label>
                    <Input
                      id="paddingTop"
                      className="mt-1"
                      value={selectedElement?.styles?.paddingTop || ""}
                      onChange={(e) =>
                        handleNumberInput("paddingTop", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paddingRight" className="text-xs">
                      Right
                    </Label>
                    <Input
                      id="paddingRight"
                      className="mt-1"
                      value={selectedElement?.styles?.paddingRight || ""}
                      onChange={(e) =>
                        handleNumberInput("paddingRight", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paddingBottom" className="text-xs">
                      Bottom
                    </Label>
                    <Input
                      id="paddingBottom"
                      className="mt-1"
                      value={selectedElement?.styles?.paddingBottom || ""}
                      onChange={(e) =>
                        handleNumberInput("paddingBottom", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                  <div>
                    <Label htmlFor="paddingLeft" className="text-xs">
                      Left
                    </Label>
                    <Input
                      id="paddingLeft"
                      className="mt-1"
                      value={selectedElement?.styles?.paddingLeft || ""}
                      onChange={(e) =>
                        handleNumberInput("paddingLeft", e.target.value)
                      }
                      placeholder="px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="border">
        <AccordionTrigger className="text-sm font-medium">
          Border
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="borderWidth" className="w-1/3">
                Width
              </Label>
              <Input
                id="borderWidth"
                className="flex-1"
                value={selectedElement?.styles?.borderWidth || ""}
                onChange={(e) =>
                  handleNumberInput("borderWidth", e.target.value)
                }
                placeholder="e.g., 1px"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="borderStyle" className="w-1/3">
                Style
              </Label>
              <Select
                value={
                  (selectedElement?.styles?.borderStyle as string) || "solid"
                }
                onValueChange={(value) =>
                  handleSelectChange("borderStyle", value)
                }
              >
                <SelectTrigger id="borderStyle" className="flex-1">
                  <SelectValue placeholder="Select style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="borderColor" className="w-1/3">
                Color
              </Label>
              <div className="flex-1 flex items-center gap-2">
                <Input
                  type="color"
                  id="borderColor"
                  className="w-10 h-10 p-1"
                  value={selectedElement?.styles?.borderColor || "#000000"}
                  onChange={(e) =>
                    handleSelectChange("borderColor", e.target.value)
                  }
                />
                <Input
                  id="borderColorText"
                  className="flex-1"
                  value={selectedElement?.styles?.borderColor || ""}
                  onChange={(e) =>
                    handleSelectChange("borderColor", e.target.value)
                  }
                  placeholder="#000000"
                />
              </div>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="borderRadius" className="w-1/3">
                Radius
              </Label>
              <Input
                id="borderRadius"
                className="flex-1"
                value={selectedElement?.styles?.borderRadius || ""}
                onChange={(e) =>
                  handleNumberInput("borderRadius", e.target.value)
                }
                placeholder="e.g., 4px"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="effects">
        <AccordionTrigger className="text-sm font-medium">
          Effects & Layout
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="opacity">
                Opacity (
                {Math.round(
                  ((selectedElement?.styles?.opacity as number) || 1) * 100
                )}
                %)
              </Label>
              <Slider
                id="opacity"
                className="mt-2"
                defaultValue={[
                  ((selectedElement?.styles?.opacity as number) || 1) * 100,
                ]}
                max={100}
                step={1}
                onValueChange={handleOpacityChange}
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="boxShadow" className="w-1/3">
                Shadow
              </Label>
              <Input
                id="boxShadow"
                className="flex-1"
                value={selectedElement?.styles?.boxShadow || ""}
                onChange={(e) =>
                  handleSelectChange("boxShadow", e.target.value)
                }
                placeholder="e.g., 0 2px 4px rgba(0,0,0,0.1)"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="position" className="w-1/3">
                Position
              </Label>
              <Select
                value={
                  (selectedElement?.styles?.position as string) || "static"
                }
                onValueChange={(value) => handleSelectChange("position", value)}
              >
                <SelectTrigger id="position" className="flex-1">
                  <SelectValue placeholder="Select position" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="static">Static</SelectItem>
                  <SelectItem value="relative">Relative</SelectItem>
                  <SelectItem value="absolute">Absolute</SelectItem>
                  <SelectItem value="fixed">Fixed</SelectItem>
                  <SelectItem value="sticky">Sticky</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="zIndex" className="w-1/3">
                Z-Index
              </Label>
              <Input
                id="zIndex"
                type="number"
                className="flex-1"
                value={selectedElement?.styles?.zIndex || ""}
                onChange={(e) => handleNumberInput("zIndex", e.target.value)}
                placeholder="e.g., 1"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="transform" className="w-1/3">
                Transform
              </Label>
              <Input
                id="transform"
                className="flex-1"
                value={selectedElement?.styles?.transform || ""}
                onChange={(e) =>
                  handleSelectChange("transform", e.target.value)
                }
                placeholder="e.g., rotate(45deg)"
              />
            </div>

            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="overflow">Hide Overflow</Label>
              <Switch
                id="overflow"
                checked={selectedElement?.styles?.overflow === "hidden"}
                onCheckedChange={(checked) =>
                  handleSelectChange("overflow", checked ? "hidden" : "visible")
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default BaseConfiguration;
