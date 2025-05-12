import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, EyeClosed, Image as ImageIcon } from "lucide-react";
import { EditorElement } from "@/lib/type";
import { useEditorStore } from "@/lib/store/editorStore";
import { startTransition } from "react";
import { useCanvasStore } from "@/lib/store/canvasStore";
import useSWR from "swr";
import { getFontFamily } from "@/actions";
import { loadFont } from "@/app/utils/LoadFont";
import { CanvasStyles } from "@/lib/interface";

interface AppearanceProps {
  selectedElement?: EditorElement;
  onChange?: (property: string, value: unknown) => void;
  styles?: CanvasStyles;
  isCanvas?: boolean;
}

const AppearanceAccordion: React.FC<AppearanceProps> = ({
  selectedElement,
  onChange,
  styles,
  isCanvas = false,
}) => {
  const { updateElementOptimistically } = useEditorStore();
  const { canvasFontFamilies, setFontFamilies } = useCanvasStore();
  const { data: googleFontFamilies = [] } = useSWR(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`,
    getFontFamily
  );

  const handleChange = (property: string, value: string | boolean | number) => {
    if (onChange) {
      onChange(property, value);
    } else if (selectedElement) {
      startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          styles: {
            ...selectedElement.styles,
            [property]: value,
          },
        });
      });
    }
  };

  const currentStyles = selectedElement?.styles || styles || {};

  const getBackgroundSizeValue = (): string => {
    const bgSize = currentStyles?.backgroundSize;
    if (bgSize === undefined) return "cover";
    if (typeof bgSize === "number") return `${bgSize}px`;
    return String(bgSize);
  };

  const getBackgroundPositionValue = (): string => {
    const bgPosition = currentStyles?.backgroundPosition;
    if (bgPosition === undefined) return "center";
    if (typeof bgPosition === "number") return `${bgPosition}px`;
    return String(bgPosition);
  };

  return (
    <AccordionItem value="appearance">
      <AccordionTrigger className="text-sm font-medium">
        Appearance
      </AccordionTrigger>
      <AccordionContent>
        <div className="flex">
          {selectedElement?.styles?.visibility === "hidden" ? (
            <EyeClosed
              className="w-4 h-4 text-muted-foreground"
              onClick={() => handleChange("visibility", "visible")}
            />
          ) : (
            <Eye
              className="w-4 h-4 text-primary"
              onClick={() => handleChange("visibility", "hidden")}
            />
          )}
        </div>
        <div className="flex flex-col gap-4 p-1">
          {/* Font Family - Only visible for Canvas */}
          {isCanvas && (
            <div className="flex flex-col gap-2">
              <Label htmlFor="fontFamily" className="text-xs">
                Default Font Family
              </Label>
              <Select
                value={currentStyles?.fontFamily || ""}
                onValueChange={(value) => {
                  handleChange("fontFamily", value);
                  loadFont(value);
                  if (!canvasFontFamilies.includes(value)) {
                    setFontFamilies([...canvasFontFamilies, value]);
                  }
                }}
              >
                <SelectTrigger id="fontFamily" className="h-8 text-xs">
                  <SelectValue placeholder="Select default font" />
                </SelectTrigger>
                <SelectContent>
                  {googleFontFamilies.map((font: string) => (
                    <SelectItem key={font} value={font}>
                      {font}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
          {/* Text */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="text" className="text-xs">
              Text Color
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                id="backgroundColor"
                className="w-10 h-8 p-1"
                value={currentStyles?.color || "#ffffff"}
                onChange={(e) => handleChange("color", e.target.value)}
              />
              <Input
                id="backgroundColorText"
                className="flex-1 h-8 text-xs"
                value={currentStyles?.color || ""}
                onChange={(e) => {
                  handleChange("backgroundColor", e.target.value);
                }}
                placeholder="#ffffff"
              />
            </div>
          </div>

          {/* Background Color */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="backgroundColor" className="text-xs">
              Background Color
            </Label>
            <div className="flex items-center gap-2">
              <Input
                type="color"
                id="backgroundColor"
                className="w-10 h-8 p-1"
                value={currentStyles?.backgroundColor || "#ffffff"}
                onChange={(e) =>
                  handleChange("backgroundColor", e.target.value)
                }
              />
              <Input
                id="backgroundColorText"
                className="flex-1 h-8 text-xs"
                value={currentStyles?.backgroundColor || ""}
                onChange={(e) => {
                  handleChange("backgroundColor", e.target.value);
                }}
                placeholder="#ffffff"
              />
            </div>
          </div>

          {/* Background Image */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="backgroundImage" className="text-xs">
              Background Image
            </Label>
            <div className="flex items-center gap-2">
              <div className="w-10 h-8 flex items-center justify-center border rounded">
                {currentStyles?.backgroundImage ? (
                  <div
                    className="w-full h-full bg-center bg-no-repeat bg-cover"
                    style={{ backgroundImage: currentStyles.backgroundImage }}
                  />
                ) : (
                  <ImageIcon className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <Input
                id="backgroundImage"
                className="flex-1 h-8 text-xs"                
                value={currentStyles?.backgroundImage && currentStyles.backgroundImage.startsWith("url") 
                  ? currentStyles.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/i, "$1") 
                  : ""}
                onChange={(e) => {
                  if (currentStyles?.backgroundImage && currentStyles.backgroundImage.includes("linear-gradient")) {
                    return;
                  }
                  handleChange("backgroundImage", e.target.value ? `url(${e.target.value})` : "");
                }}
                placeholder="url('/path/to/image.jpg')"
                disabled={currentStyles?.backgroundImage && currentStyles.backgroundImage.includes("linear-gradient")}
              />
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            <Label className="text-xs">
              Background Gradient
            </Label>            
            <div className="flex items-center mb-2">
              <Input
                type="checkbox" 
                id="useGradient"
                checked={!!(currentStyles?.backgroundImage && currentStyles.backgroundImage.includes("linear-gradient"))}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleChange("backgroundImage", "linear-gradient(to right, #4facfe, #00f2fe)");
                  } else {
                    handleChange("backgroundImage", "");
                  }
                }}
                className="w-4 h-4 mr-2 accent-blue-500 cursor-pointer"
              />
              <Label htmlFor="useGradient" className="text-xs cursor-pointer">
                Use Gradient
              </Label>
            </div>
            
            {currentStyles?.backgroundImage && currentStyles.backgroundImage.includes("linear-gradient") && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label className="text-xs w-20">Direction:</Label>
                  <Select
                    value={
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to right") ? "to right" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to left") ? "to left" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to bottom") ? "to bottom" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to top") ? "to top" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to bottom right") ? "to bottom right" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to bottom left") ? "to bottom left" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to top right") ? "to top right" :
                      currentStyles.backgroundImage && currentStyles.backgroundImage.includes("to top left") ? "to top left" : "to right"
                    }
                    onValueChange={(value) => {
                      if (!currentStyles.backgroundImage) return;
                      
                      const colorMatch = currentStyles.backgroundImage.match(/linear-gradient\([^,]+,\s*([^,]+),\s*([^)]+)\)/);
                      const color1 = colorMatch?.[1]?.trim() || "#4facfe";
                      const color2 = colorMatch?.[2]?.trim() || "#00f2fe";
                      
                      handleChange("backgroundImage", `linear-gradient(${value}, ${color1}, ${color2})`);
                    }}
                  >
                    <SelectTrigger className="h-8 text-xs">
                      <SelectValue placeholder="Gradient direction" />
                    </SelectTrigger>                    <SelectContent>
                      <SelectItem value="to right">Horizontal → (Right)</SelectItem>
                      <SelectItem value="to left">Horizontal ← (Left)</SelectItem>
                      <SelectItem value="to bottom">Vertical ↓ (Down)</SelectItem>
                      <SelectItem value="to top">Vertical ↑ (Up)</SelectItem>
                      <SelectItem value="to bottom right">Diagonal ↘ (Bottom Right)</SelectItem>
                      <SelectItem value="to bottom left">Diagonal ↙ (Bottom Left)</SelectItem>
                      <SelectItem value="to top right">Diagonal ↗ (Top Right)</SelectItem>
                      <SelectItem value="to top left">Diagonal ↖ (Top Left)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Label className="text-xs w-20">Start color:</Label>
                    <Input
                      type="color"
                      className="w-16 h-8 p-1"                      
                      value={currentStyles.backgroundImage ? 
                        ((currentStyles.backgroundImage.match(/#[a-f\d]{3,6}|rgba?\([^)]+\)/gi) || ["#4facfe"])[0] || "#4facfe") 
                        : "#4facfe"}
                      onChange={(e) => {
                        if (!currentStyles.backgroundImage) return;
                        
                        const match = currentStyles.backgroundImage.match(/linear-gradient\(([^,]+),\s*[^,]+,\s*([^)]+)\)/);
                        const direction = match?.[1]?.trim() || "to right";
                        const color2 = match?.[2]?.trim() || "#00f2fe";
                        
                        handleChange("backgroundImage", `linear-gradient(${direction}, ${e.target.value}, ${color2})`);
                      }}
                    />
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Label className="text-xs w-20">End color:</Label>
                    <Input
                      type="color"
                      className="w-16 h-8 p-1"                     
                      value={currentStyles.backgroundImage ? 
                        ((currentStyles.backgroundImage.match(/#[a-f\d]{3,6}|rgba?\([^)]+\)/gi) || ["#4facfe", "#00f2fe"])[1] || "#00f2fe") 
                        : "#00f2fe"}
                      onChange={(e) => {
                        if (!currentStyles.backgroundImage) return;
                        
                        const match = currentStyles.backgroundImage.match(/linear-gradient\(([^,]+),\s*([^,]+),\s*[^)]+\)/);
                        const direction = match?.[1]?.trim() || "to right";
                        const color1 = match?.[2]?.trim() || "#4facfe";
                        
                        handleChange("backgroundImage", `linear-gradient(${direction}, ${color1}, ${e.target.value})`);
                      }}
                    />
                  </div>
                </div>
                <div 
                  className="h-8 mt-2 rounded border"
                  style={{
                    backgroundImage: currentStyles.backgroundImage || ""
                  }}
                />
              </div>
            )}
          </div>          
          
          {currentStyles?.backgroundImage && !currentStyles.backgroundImage.includes("linear-gradient") && (
            <>
              <div className="flex flex-col gap-1">
                <Label htmlFor="backgroundSize" className="text-xs">
                  Background Size
                </Label>
                <Select
                  value={getBackgroundSizeValue()}
                  onValueChange={(value) =>
                    handleChange("backgroundSize", value)
                  }
                >
                  <SelectTrigger id="backgroundSize" className="h-8 text-xs">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cover">Cover</SelectItem>
                    <SelectItem value="contain">Contain</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="100% 100%">Stretch</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="backgroundAttachment" className="text-xs">
                  Background Attachment
                </Label>
                <Select
                  value={currentStyles?.backgroundAttachment || "scroll"}
                  onValueChange={(value) =>
                    handleChange("backgroundAttachment", value)
                  }
                >
                  <SelectTrigger
                    id="backgroundAttachment"
                    className="h-8 text-xs"
                  >
                    <SelectValue placeholder="Select attachment" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scroll">Scroll</SelectItem>
                    <SelectItem value="fixed">Fixed</SelectItem>
                    <SelectItem value="local">Local</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1">
                <Label htmlFor="backgroundPosition" className="text-xs">
                  Background Position
                </Label>
                <Select
                  value={getBackgroundPositionValue()}
                  onValueChange={(value) =>
                    handleChange("backgroundPosition", value)
                  }
                >
                  <SelectTrigger
                    id="backgroundPosition"
                    className="h-8 text-xs"
                  >
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="center">Center</SelectItem>
                    <SelectItem value="top">Top</SelectItem>
                    <SelectItem value="bottom">Bottom</SelectItem>
                    <SelectItem value="left">Left</SelectItem>
                    <SelectItem value="right">Right</SelectItem>
                    <SelectItem value="top left">Top Left</SelectItem>
                    <SelectItem value="top right">Top Right</SelectItem>
                    <SelectItem value="bottom left">Bottom Left</SelectItem>
                    <SelectItem value="bottom right">Bottom Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="backgroundRepeat" className="text-xs">
                  Background Repeat
                </Label>
                <Select
                  value={currentStyles?.backgroundRepeat || "no-repeat"}
                  onValueChange={(value) =>
                    handleChange("backgroundRepeat", value)
                  }
                >
                  <SelectTrigger id="backgroundRepeat" className="h-8 text-xs">
                    <SelectValue placeholder="Select repeat" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no-repeat">No Repeat</SelectItem>
                    <SelectItem value="repeat">Repeat</SelectItem>
                    <SelectItem value="repeat-x">Repeat X</SelectItem>
                    <SelectItem value="repeat-y">Repeat Y</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Border Radius */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="borderRadius" className="text-xs">
              Border Radius
            </Label>
            <Input
              id="borderRadius"
              className="h-8 text-xs"
              value={currentStyles?.borderRadius || ""}
              onChange={(e) => handleChange("borderRadius", e.target.value)}
              placeholder="0px"
            />
          </div>

          {/* Border */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="border" className="text-xs">
              Border
            </Label>
            <Input
              id="border"
              className="h-8 text-xs"
              value={currentStyles?.border || ""}
              onChange={(e) => handleChange("border", e.target.value)}
              placeholder="1px solid #eeeeee"
            />
          </div>

          {/* Box Shadow */}
          <div className="flex flex-col gap-2">
            <Label htmlFor="boxShadow" className="text-xs">
              Box Shadow
            </Label>
            <Select
              value={currentStyles?.boxShadow || "none"}
              onValueChange={(value) => handleChange("boxShadow", value)}
            >
              <SelectTrigger id="boxShadow" className="h-8 text-xs">
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
  );
};

export default AppearanceAccordion;
