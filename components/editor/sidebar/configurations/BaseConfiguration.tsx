import React, { startTransition } from "react";
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
import { EditorElement } from "@/lib/type";
import Typography from "./accorditionitem/Typography";
import { useEditorStore } from "@/lib/store/editorStore";
import AppearanceAccordion from "./accorditionitem/AppearanceAccordion";

type Props = {
  selectedElement: EditorElement;
};

const BaseConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();

  const handleNumberInput = React.useCallback(
    (property: string, value: string | number) => {
      if (!selectedElement) return;

      let formattedValue = value;

      if (property === "margin" || property === "padding") {
        if (typeof value === "string" && /^\d+$/.test(value)) {
          formattedValue = `${value}px`;
        }
      } else {
        if (typeof value === "number") {
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
            "letterSpacing",
          ];

          if (needsPxSuffix.includes(property)) {
            formattedValue = `${value}px`;
          }
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
      defaultValue={[
        "typography",
        "appearance",
        "spacing",
        "border",
        "effects",
      ]}
      className="w-full"
    >
      <Typography selectedElement={selectedElement} />
      <AppearanceAccordion selectedElement={selectedElement} />
      {/*Margin and Padding settings*/}
      <AccordionItem value="spacing">
        <AccordionTrigger className="text-sm font-medium">
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <AccordionItem value="auto">
            <AccordionTrigger className="text-sm font-medium">
              Manual
            </AccordionTrigger>
            <AccordionContent>
              <AccordionItem value="margin">
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
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.marginTop
                                ? parseInt(
                                    String(selectedElement?.styles?.marginTop)
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "marginTop",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="marginRight" className="text-xs">
                            Right
                          </Label>
                          <Input
                            id="marginRight"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.marginRight
                                ? parseInt(
                                    String(selectedElement?.styles?.marginRight)
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "marginRight",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="marginBottom" className="text-xs">
                            Bottom
                          </Label>
                          <Input
                            id="marginBottom"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.marginBottom
                                ? parseInt(
                                    String(
                                      selectedElement?.styles?.marginBottom
                                    )
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "marginBottom",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="marginLeft" className="text-xs">
                            Left
                          </Label>
                          <Input
                            id="marginLeft"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.marginLeft
                                ? parseInt(
                                    String(selectedElement?.styles?.marginLeft)
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "marginLeft",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
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
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.paddingTop
                                ? parseInt(
                                    String(selectedElement?.styles?.paddingTop)
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "paddingTop",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="paddingRight" className="text-xs">
                            Right
                          </Label>
                          <Input
                            id="paddingRight"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.paddingRight
                                ? parseInt(
                                    String(
                                      selectedElement?.styles?.paddingRight
                                    )
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "paddingRight",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="paddingBottom" className="text-xs">
                            Bottom
                          </Label>
                          <Input
                            id="paddingBottom"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.paddingBottom
                                ? parseInt(
                                    String(
                                      selectedElement?.styles?.paddingBottom
                                    )
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "paddingBottom",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="paddingLeft" className="text-xs">
                            Left
                          </Label>
                          <Input
                            id="paddingLeft"
                            type="number"
                            className="mt-1"
                            value={
                              selectedElement?.styles?.paddingLeft
                                ? parseInt(
                                    String(selectedElement?.styles?.paddingLeft)
                                  )
                                : ""
                            }
                            onChange={(e) =>
                              handleNumberInput(
                                "paddingLeft",
                                parseInt(e.target.value)
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            </AccordionContent>
          </AccordionItem>

          <div className="mt-4">
            <AccordionItem value="auto">
              <AccordionTrigger className="text-sm font-medium">
                Auto Spacing
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="marginSlider">
                      Margin (
                      {Math.round(
                        parseInt(
                          (selectedElement?.styles?.margin as string) || "0"
                        ) || 0
                      )}
                      px)
                    </Label>
                    <Slider
                      id="marginSlider"
                      className="mt-2"
                      defaultValue={[
                        parseInt(
                          (selectedElement?.styles?.margin as string) || "0"
                        ) || 0,
                      ]}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        handleNumberInput("margin", `${value[0]}px`);
                      }}
                    />
                  </div>

                  <div>
                    <Label htmlFor="paddingSlider">
                      Padding (
                      {Math.round(
                        parseInt(
                          (selectedElement?.styles?.padding as string) || "0"
                        ) || 0
                      )}
                      px)
                    </Label>
                    <Slider
                      id="paddingSlider"
                      className="mt-2"
                      defaultValue={[
                        parseInt(
                          (selectedElement?.styles?.padding as string) || "0"
                        ) || 0,
                      ]}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        handleNumberInput("padding", `${value[0]}px`);
                      }}
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </div>
        </AccordionContent>
      </AccordionItem>
      {/*Border settings*/}
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
