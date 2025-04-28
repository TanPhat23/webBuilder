import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorElement } from "@/lib/type";
import React, { startTransition, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Label } from "@/components/ui/label";
import { ButtonElement } from "@/lib/interface";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Slider } from "@/components/ui/slider";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";

type Props = {
  selectedElement: EditorElement;
};

const ButtonConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();
  const [buttonType, setButtonType] = useState<string>(
    selectedElement.type || "single"
  );
  const [backgroundColor, setBackgroundColor] = useState<string>(
    (selectedElement as ButtonElement).styles?.backgroundColor || "#ffffff"
  );
  const [textColor, setTextColor] = useState<string>(
    (selectedElement as ButtonElement).styles?.color || "#374151"
  );
  const [localFontSize, setLocalFontSize] = useState(
    selectedElement?.styles?.fontSize || ""
  );

  useEffect(() => {
    if (selectedElement) {
      const buttonElement = selectedElement as ButtonElement;
      setButtonType(buttonElement.buttonType || "single");
      setBackgroundColor(buttonElement.styles?.backgroundColor || "#ffffff");
      setTextColor(buttonElement.styles?.color || "#374151");
      setLocalFontSize(selectedElement?.styles?.fontSize || "");
    }
  }, [selectedElement]);

  const handleButtonTypeChange = (value: string) => {
    if (!selectedElement) return;

    startTransition(() => {
      if (value === "multi") {
        // Convert to multi-button (dropdown)
        updateElementOptimistically(selectedElement.id, {
          type: "Button",
          buttonType: "multi",
          element: {
            type: "Frame",
            name: "Dropdown Content",
            id: uuidv4(),
            styles: {
              display: "flex",
              flexDirection: "column",
              width: "100%",
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "6px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              padding: "4px",
              gap: "2px",
              overflow: "hidden",
            },
            content: "",
            elements: [
              {
                type: "Button",
                id: uuidv4(),
                content: "Option 1",
                isSelected: false,
                x: 0,
                y: 0,
                buttonType: "primary",
                styles: {
                  padding: "8px 12px",
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: "transparent",
                  color: "#374151",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontWeight: "normal",
                  fontSize: "14px",
                },
                tailwindStyles:
                  "text-gray-700 hover:bg-gray-100 rounded w-full text-left",
              },
              {
                type: "Button",
                id: uuidv4(),
                content: "Option 2",
                isSelected: false,
                x: 0,
                y: 0,
                buttonType: "primary",
                styles: {
                  padding: "8px 12px",
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: "transparent",
                  color: "#374151",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontWeight: "normal",
                  fontSize: "14px",
                },
                tailwindStyles:
                  "text-gray-700 hover:bg-gray-100 rounded w-full text-left",
              },
              {
                type: "Button",
                id: uuidv4(),
                content: "Option 3",
                isSelected: false,
                x: 0,
                y: 0,
                buttonType: "primary",
                styles: {
                  padding: "8px 12px",
                  width: "100%",
                  textAlign: "left",
                  backgroundColor: "transparent",
                  color: "#374151",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "background-color 0.2s",
                  fontWeight: "normal",
                  fontSize: "14px",
                },
                tailwindStyles:
                  "text-gray-700 hover:bg-gray-100 rounded w-full text-left",
              },
            ],
            isSelected: false,
            x: 0,
            y: 0,
          },
        });
        setButtonType("multi");
      } else {
        updateElementOptimistically(selectedElement.id, {
          type: "Button",
          buttonType: value,
          element: undefined,
        });
        setButtonType(value);
      }
    });
  };

  const handleBackgroundColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBackgroundColor(newColor);
    
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...(selectedElement as ButtonElement).styles,
          backgroundColor: newColor,
        },
      });
    });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextColor(newColor);
    
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...(selectedElement as ButtonElement).styles,
          color: newColor,
        },
      });
    });
  };

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
          ...(selectedElement as ButtonElement).styles,
          [property]: formattedValue,
        },
      });
    });
  };

  const handleOpacityChange = (value: number[]) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...(selectedElement as ButtonElement).styles,
          opacity: value[0] / 100,
        },
      });
    });
  };

  const handleSelectChange = (property: string, value: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...(selectedElement as ButtonElement).styles,
          [property]: value,
        },
      });
    });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["basic", "typography", "appearance", "border"]}
      className="w-full"
    >
      <AccordionItem value="basic">
        <AccordionTrigger className="text-sm font-medium">
          Basic Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Button Type
              </Label>
              <Select value={buttonType} onValueChange={handleButtonTypeChange}>
                <SelectTrigger className="w-full text-sm">
                  <div className="flex items-center gap-2">
                    {buttonType === "multi" ? (
                      <>
                        <span>Dropdown</span>
                      </>
                    ) : buttonType === "submit" ? (
                      <>
                        <span>Submit</span>
                      </>
                    ) : (
                      <>
                        <span>Standard</span>
                      </>
                    )}
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Standard Button</SelectItem>
                  <SelectItem value="submit">Submit Button</SelectItem>
                  <SelectItem value="multi">Dropdown Button</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1.5">
                {buttonType === "multi"
                  ? "Dropdown menu with multiple selectable options"
                  : buttonType === "submit"
                  ? "Form submit button that triggers form submission"
                  : "Standard clickable button with single action"}
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

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
                  />
                  <FontSizeComboBox selectedElement={selectedElement} />
                </div>
                <label className="text-xs">Font size</label>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <FontFamilyComboBox
                  selectedElement={selectedElement}
                  fontFamilies={['Arial', 'Helvetica', 'Times New Roman', 'Roboto', 'Open Sans', 'Lato']}
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

              <div className="flex flex-row items-center gap-2">
                <Label htmlFor="fontWeight" className="w-1/3">
                  Font Weight
                </Label>
                <Select
                  value={
                    (selectedElement?.styles?.fontWeight as string) || "normal"
                  }
                  onValueChange={(value) =>
                    handleSelectChange("fontWeight", value)
                  }
                >
                  <SelectTrigger id="fontWeight" className="flex-1">
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal (400)</SelectItem>
                    <SelectItem value="bold">Bold (700)</SelectItem>
                    <SelectItem value="lighter">Lighter (300)</SelectItem>
                    <SelectItem value="bolder">Bolder (800)</SelectItem>
                    <SelectItem value="100">Thin (100)</SelectItem>
                    <SelectItem value="300">Light (300)</SelectItem>
                    <SelectItem value="500">Medium (500)</SelectItem>
                    <SelectItem value="600">Semi-bold (600)</SelectItem>
                    <SelectItem value="900">Extra-bold (900)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger className="text-sm font-medium">
          Appearance
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Background Color
              </Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 border rounded" 
                  style={{ backgroundColor: backgroundColor }}
                ></div>
                <Input
                  type="text"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="flex-1"
                />
                <Input
                  type="color"
                  value={backgroundColor}
                  onChange={handleBackgroundColorChange}
                  className="w-10 h-10 p-1 cursor-pointer"
                />
              </div>
            </div>

            <div>
              <Label className="text-xs font-medium text-muted-foreground mb-1.5 block">
                Text Color
              </Label>
              <div className="flex items-center gap-2">
                <div 
                  className="w-6 h-6 border rounded" 
                  style={{ backgroundColor: textColor }}
                ></div>
                <Input
                  type="text"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="flex-1"
                />
                <Input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="w-10 h-10 p-1 cursor-pointer"
                />
              </div>
            </div>

            <div className="space-y-2">
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

            <div className="grid grid-cols-2 gap-3">
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
    </Accordion>
  );
};

export default ButtonConfiguration;
