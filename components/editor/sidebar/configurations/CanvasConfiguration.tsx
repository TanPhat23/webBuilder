import React, { startTransition } from "react";
import { useCanvasStore, CanvasStyles } from "@/lib/store/canvasStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useEditorStore } from "@/lib/store/editorStore";

const CanvasConfiguration = () => {
  const { styles, setStyles } = useCanvasStore();
  const { elements, deleteElementOptimistically } = useEditorStore();

  const handleChange = (
    key: keyof CanvasStyles,
    value: string | boolean | number | undefined
  ) => {
    startTransition(() => {
      setStyles({
        ...styles,
        [key]: value,
      });
    });
  };

  const handleResetCanvas = () => {
    startTransition(() => {
      setStyles({
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        gridEnabled: false,
        gridSize: 8,
        snapToGrid: false,
        overflow: "auto",
        borderRadius: "0px",
        border: "none",
        boxShadow: "none",
      });
      elements.forEach((element) => {
        deleteElementOptimistically(element.id);
      });
    });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["dimensions", "appearance", "grid", "advanced"]}
      className="w-full"
    >
      <AccordionItem value="dimensions">
        <AccordionTrigger className="text-sm font-medium">
          Canvas Dimensions
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1">
                <Label htmlFor="canvasWidth" className="text-xs">
                  Width
                </Label>
                <Input
                  id="canvasWidth"
                  className="h-8 text-xs"
                  value={styles?.width || ""}
                  onChange={(e) => handleChange("width", e.target.value)}
                  placeholder="e.g., 1200px"
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="canvasHeight" className="text-xs">
                  Height
                </Label>
                <Input
                  id="canvasHeight"
                  className="h-8 text-xs"
                  value={styles?.height || ""}
                  onChange={(e) => handleChange("height", e.target.value)}
                  placeholder="e.g., 800px"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="canvasMaxWidth" className="text-xs">
                Max Width
              </Label>
              <Input
                id="canvasMaxWidth"
                className="h-8 text-xs"
                value={styles?.maxWidth || ""}
                onChange={(e) => handleChange("maxWidth", e.target.value)}
                placeholder="e.g., 1440px"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="canvasAutoHeight" className="text-xs">
                Auto Height
              </Label>
              <Switch
                id="canvasAutoHeight"
                checked={styles?.height === "auto"}
                onCheckedChange={(checked) =>
                  handleChange("height", checked ? "auto" : "800px")
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger className="text-sm font-medium">
          Appearance
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex flex-col gap-2">
              <Label htmlFor="backgroundColor" className="text-xs">
                Background Color
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  type="color"
                  id="backgroundColor"
                  className="w-10 h-8 p-1"
                  value={styles?.backgroundColor || "#ffffff"}
                  onChange={(e) =>
                    handleChange("backgroundColor", e.target.value)
                  }
                />
                <Input
                  id="backgroundColorText"
                  className="flex-1 h-8 text-xs"
                  value={styles?.backgroundColor || ""}
                  onChange={(e) =>
                    handleChange("backgroundColor", e.target.value)
                  }
                  placeholder="#ffffff"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="canvasBorderRadius" className="text-xs">
                Border Radius
              </Label>
              <div className="flex items-center gap-2">
                <Input
                  id="canvasBorderRadius"
                  className="h-8 text-xs"
                  value={styles?.borderRadius || ""}
                  onChange={(e) => handleChange("borderRadius", e.target.value)}
                  placeholder="0px"
                />
                <Slider
                  className="flex-1"
                  defaultValue={[0]}
                  max={20}
                  step={1}
                  value={[parseInt(String(styles?.borderRadius || "0")) || 0]}
                  onValueChange={(val) =>
                    handleChange("borderRadius", `${val[0]}px`)
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="canvasBorder" className="text-xs">
                Border
              </Label>
              <Input
                id="canvasBorder"
                className="h-8 text-xs"
                value={styles?.border || ""}
                onChange={(e) => handleChange("border", e.target.value)}
                placeholder="1px solid #eeeeee"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="canvasBoxShadow" className="text-xs">
                Box Shadow
              </Label>
              <Select
                value={styles?.boxShadow || "none"}
                onValueChange={(value) => handleChange("boxShadow", value)}
              >
                <SelectTrigger id="canvasBoxShadow" className="h-8 text-xs">
                  <SelectValue placeholder="Choose a shadow style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="0 1px 3px rgba(0,0,0,0.12)">
                    Light
                  </SelectItem>
                  <SelectItem value="0 4px 6px rgba(0,0,0,0.1)">
                    Medium
                  </SelectItem>
                  <SelectItem value="0 10px 15px rgba(0,0,0,0.1)">
                    Strong
                  </SelectItem>
                  <SelectItem value="0 20px 25px rgba(0,0,0,0.15)">
                    Extra Strong
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="grid">
        <AccordionTrigger className="text-sm font-medium">
          Grid Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="gridEnabled" className="text-xs">
                Show Grid
              </Label>
              <Switch
                id="gridEnabled"
                checked={styles?.gridEnabled || false}
                onCheckedChange={(checked) =>
                  handleChange("gridEnabled", checked)
                }
              />
            </div>

            {styles?.gridEnabled && (
              <>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="gridSize" className="text-xs">
                    Grid Size
                  </Label>
                  <Select
                    value={String(styles?.gridSize || 8)}
                    onValueChange={(value) =>
                      handleChange("gridSize", parseInt(value))
                    }
                  >
                    <SelectTrigger id="gridSize" className="h-8 text-xs">
                      <SelectValue placeholder="Select grid size" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">4px</SelectItem>
                      <SelectItem value="8">8px</SelectItem>
                      <SelectItem value="10">10px</SelectItem>
                      <SelectItem value="16">16px</SelectItem>
                      <SelectItem value="20">20px</SelectItem>
                      <SelectItem value="24">24px</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="snapToGrid" className="text-xs">
                    Snap to Grid
                  </Label>
                  <Switch
                    id="snapToGrid"
                    checked={styles?.snapToGrid || false}
                    onCheckedChange={(checked) =>
                      handleChange("snapToGrid", checked)
                    }
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="gridColor" className="text-xs">
                    Grid Color
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="color"
                      id="gridColor"
                      className="w-10 h-8 p-1"
                      value={styles?.gridColor || "#dddddd"}
                      onChange={(e) =>
                        handleChange("gridColor", e.target.value)
                      }
                    />
                    <Input
                      id="gridColorText"
                      className="flex-1 h-8 text-xs"
                      value={styles?.gridColor || ""}
                      onChange={(e) =>
                        handleChange("gridColor", e.target.value)
                      }
                      placeholder="#dddddd"
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="advanced">
        <AccordionTrigger className="text-sm font-medium">
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="canvasOverflow" className="text-xs">
                Overflow
              </Label>
              <Select
                value={styles?.overflow || "auto"}
                onValueChange={(value) => handleChange("overflow", value)}
              >
                <SelectTrigger id="canvasOverflow" className="w-24 h-8 text-xs">
                  <SelectValue placeholder="Overflow" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="auto">Auto</SelectItem>
                  <SelectItem value="hidden">Hidden</SelectItem>
                  <SelectItem value="scroll">Scroll</SelectItem>
                  <SelectItem value="visible">Visible</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="canvasBackdrop" className="text-xs">
                Background Backdrop
              </Label>
              <Switch
                id="canvasBackdrop"
                checked={styles?.backdropFilter !== undefined}
                onCheckedChange={(checked) =>
                  handleChange(
                    "backdropFilter",
                    checked ? "blur(8px)" : undefined
                  )
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="canvasTransition" className="text-xs">
                Animations
              </Label>
              <Select
                value={styles?.transition || "none"}
                onValueChange={(value) =>
                  handleChange(
                    "transition",
                    value === "none" ? undefined : value
                  )
                }
              >
                <SelectTrigger id="canvasTransition" className="h-8 text-xs">
                  <SelectValue placeholder="Select animation style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="all 0.3s ease">Smooth</SelectItem>
                  <SelectItem value="all 0.5s ease-in-out">
                    Ease In-Out
                  </SelectItem>
                  <SelectItem value="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)">
                    Material
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <div className="flex justify-between mt-4">
        <Button
          variant="destructive"
          size="sm"
          className="flex gap-1 items-center w-full"
          onClick={handleResetCanvas}
        >
          <RefreshCw className="h-3.5 w-3.5" />
          <span>Reset Canvas</span>
        </Button>
      </div>
    </Accordion>
  );
};

export default CanvasConfiguration;
