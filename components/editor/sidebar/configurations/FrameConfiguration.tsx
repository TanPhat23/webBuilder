import React, { startTransition } from "react";
import FlexDirectionSelect from "./selects/FrameFlexDirectionSelect";
import AlignItemSelect from "./selects/FrameAlignItemSelect";
import JustifyContentSelect from "./selects/FrameJustifyContentSelect";
import FrameGapSelect from "./selects/FrameGapSelect";
import FrameFlexWrapSelect from "./selects/FrameFlexWrapSelect";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { EditorElement } from "@/lib/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "./accorditionitem/Typography";
import AppearanceAccordion from "./accorditionitem/AppearanceAccordion";
import { useEditorStore } from "@/lib/store/editorStore";

type Props = {
  selectedElement: EditorElement;
};

const FrameConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();

  const extractNumericValue = (cssValue: string | undefined): string => {
    if (!cssValue) return "0";
    if (cssValue === "auto" || cssValue === "none") return cssValue;

    const match = cssValue.match(/^([+-]?\d*\.?\d+)/);
    return match ? match[1] : "0";
  };

  const handleNumberInput = React.useCallback(
    (property: string, value: string | number) => {
      if (!selectedElement) return;

      let formattedValue = value;

      if (typeof value === "string") {
        if (value === "auto" || value === "none" || value.trim() === "") {
          formattedValue = value.trim() === "" ? "0px" : value;
        } else {
          if (/^[+-]?\d*\.?\d+$/.test(value)) {
            formattedValue = `${value}px`;
          } else {
            formattedValue = value;
          }
        }
      } else if (typeof value === "number") {
        const needsPxSuffix = [
          "marginTop",
          "marginRight",
          "marginBottom",
          "marginLeft",
          "paddingTop",
          "paddingRight",
          "paddingBottom",
          "paddingLeft",
          "borderWidth",
          "borderRadius",
          "width",
          "height",
          "minWidth",
          "minHeight",
          "maxWidth",
          "maxHeight",
        ];

        if (needsPxSuffix.includes(property)) {
          formattedValue = `${value}px`;
        }
      }

      startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          styles: {
            ...selectedElement.styles,
            [property]: formattedValue,
          },
        });
      });
    },
    [selectedElement, updateElementOptimistically]
  );

  const handleSelectChange = React.useCallback(
    (property: string, value: string) => {
      if (!selectedElement) return;
      startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          styles: {
            ...selectedElement.styles,
            [property]: value,
          },
        });
      });
    },
    [selectedElement, updateElementOptimistically]
  );

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
      defaultValue={["layout", "spacing", "border", "effects"]}
      className="w-full"
    >
      <Typography selectedElement={selectedElement} />
      <AppearanceAccordion selectedElement={selectedElement} />

      <AccordionItem value="layout">
        <AccordionTrigger className="text-sm font-medium">
          Layout
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex flex-row gap-2 flex-wrap">
              <FlexDirectionSelect selectedElement={selectedElement} />
              <FrameFlexWrapSelect selectedElement={selectedElement} />
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
              <AlignItemSelect selectedElement={selectedElement} />
              <JustifyContentSelect selectedElement={selectedElement} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing">
        <AccordionTrigger className="text-sm font-medium">
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <FrameGapSelect selectedElement={selectedElement} />

            {/* Manual Padding Controls */}
            <div className="space-y-3">
              <Label className="text-xs font-medium">Padding</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="paddingTop"
                    className="text-xs text-muted-foreground"
                  >
                    Top
                  </Label>
                  <Input
                    id="paddingTop"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.paddingTop || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("paddingTop", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="paddingRight"
                    className="text-xs text-muted-foreground"
                  >
                    Right
                  </Label>
                  <Input
                    id="paddingRight"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.paddingRight || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("paddingRight", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="paddingBottom"
                    className="text-xs text-muted-foreground"
                  >
                    Bottom
                  </Label>
                  <Input
                    id="paddingBottom"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.paddingBottom || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("paddingBottom", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="paddingLeft"
                    className="text-xs text-muted-foreground"
                  >
                    Left
                  </Label>
                  <Input
                    id="paddingLeft"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.paddingLeft || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("paddingLeft", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
              </div>
            </div>

            {/* Manual Margin Controls */}
            <div className="space-y-3">
              <Label className="text-xs font-medium">Margin</Label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="marginTop"
                    className="text-xs text-muted-foreground"
                  >
                    Top
                  </Label>
                  <Input
                    id="marginTop"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.marginTop || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("marginTop", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="marginRight"
                    className="text-xs text-muted-foreground"
                  >
                    Right
                  </Label>
                  <Input
                    id="marginRight"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.marginRight || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("marginRight", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="marginBottom"
                    className="text-xs text-muted-foreground"
                  >
                    Bottom
                  </Label>
                  <Input
                    id="marginBottom"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.marginBottom || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("marginBottom", e.target.value)
                    }
                    placeholder="0"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label
                    htmlFor="marginLeft"
                    className="text-xs text-muted-foreground"
                  >
                    Left
                  </Label>
                  <Input
                    id="marginLeft"
                    value={extractNumericValue(
                      String(selectedElement?.styles?.marginLeft || "0px")
                    )}
                    onChange={(e) =>
                      handleNumberInput("marginLeft", e.target.value)
                    }
                    placeholder="0"
                  />
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
                value={extractNumericValue(
                  String(selectedElement?.styles?.borderWidth || "0px")
                )}
                onChange={(e) =>
                  handleNumberInput("borderWidth", e.target.value)
                }
                placeholder="1"
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
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solid">Solid</SelectItem>
                  <SelectItem value="dashed">Dashed</SelectItem>
                  <SelectItem value="dotted">Dotted</SelectItem>
                  <SelectItem value="double">Double</SelectItem>
                  <SelectItem value="groove">Groove</SelectItem>
                  <SelectItem value="ridge">Ridge</SelectItem>
                  <SelectItem value="inset">Inset</SelectItem>
                  <SelectItem value="outset">Outset</SelectItem>
                  <SelectItem value="none">None</SelectItem>
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
                  value={selectedElement?.styles?.borderColor || "#000000"}
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
                value={extractNumericValue(
                  String(selectedElement?.styles?.borderRadius || "0px")
                )}
                onChange={(e) =>
                  handleNumberInput("borderRadius", e.target.value)
                }
                placeholder="4"
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
                value={[
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
                value={selectedElement?.styles?.boxShadow || "none"}
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
                <SelectTrigger className="flex-1">
                  <SelectValue />
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
                value={extractNumericValue(
                  String(selectedElement?.styles?.zIndex || "0")
                )}
                onChange={(e) => handleNumberInput("zIndex", e.target.value)}
                placeholder="1"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="transform" className="w-1/3">
                Transform
              </Label>
              <Input
                id="transform"
                className="flex-1"
                value={selectedElement?.styles?.transform || "none"}
                onChange={(e) =>
                  handleSelectChange("transform", e.target.value)
                }
                placeholder="e.g., rotate(45deg)"
              />
            </div>

            <div className="flex flex-row items-center gap-2">
              <Label htmlFor="overflow" className="w-1/3">
                Overflow
              </Label>
              <Select
                value={
                  (selectedElement?.styles?.overflow as string) || "visible"
                }
                onValueChange={(value) => handleSelectChange("overflow", value)}
              >
                <SelectTrigger className="flex-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visible">Visible</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                  <SelectItem value="scroll">Scroll</SelectItem>
                  <SelectItem value="auto">Auto</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-row items-center justify-between">
              <Label htmlFor="clipPath" className="w-1/3">
                Clip Path
              </Label>
              <Input
                id="clipPath"
                className="flex-1"
                value={selectedElement?.styles?.clipPath || "none"}
                onChange={(e) => handleSelectChange("clipPath", e.target.value)}
                placeholder="e.g., circle(50%)"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FrameConfiguration;
