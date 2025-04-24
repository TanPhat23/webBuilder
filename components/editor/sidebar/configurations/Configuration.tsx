import React, { startTransition, useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import BorderRadiusInput from "./inputs/BorderRadiusInput";
import BorderWeightPopover from "./popovers/BorderWeightPopover";
import FrameConfiguration from "./FrameConfiguration";
import BaseConfiguration from "./BaseConfiguration";
import CarouselConfiguration from "./CarouselConfiguration";
import { CarouselElement } from "@/lib/interface";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import InputConfiguration from "./InputConfiguration";
import ButtonConfiguration from "./ButtonConfiguration";
import SelectConfiguration from "./SelectConfiguration";
import FormConfiguration from "./FormConfiguration";
import CanvasColorSelector from "./CanvasColorSelector";

// Define Google Font interface
interface GoogleFont {
  family: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  files?: Record<string, string>;
  category?: string;
  kind?: string;
}

const Configuration = () => {
  const [fontFamilies, setFontFamilies] = useState<string[]>([]);
  const { selectedElement } = useElementSelectionStore();
  const { updateElementOptimistically } = useEditorStore();

  const [localWidth, setLocalWidth] = useState(
    selectedElement?.styles?.width || ""
  );
  const [localHeight, setLocalHeight] = useState(
    selectedElement?.styles?.height || ""
  );
  const [localFontSize, setLocalFontSize] = useState(
    selectedElement?.styles?.fontSize || ""
  );

  useEffect(() => {
    setLocalWidth(selectedElement?.styles?.width || "");
    setLocalHeight(selectedElement?.styles?.height || "");
    setLocalFontSize(selectedElement?.styles?.fontSize || localFontSize);
  }, [selectedElement]);

  const handleWidthChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newWidth = e.currentTarget.value;
    setLocalWidth(newWidth);
    if (!selectedElement) return;

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          width: newWidth,
        },
      });
    });
  };

  const handleHeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newHeight = e.currentTarget.value;
    setLocalHeight(newHeight);
    if (!selectedElement) return;

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          height: newHeight,
        },
      });
    });
  };

  const getFontFamily = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY}`
      );
      const data = await response.json();
      return data.items.map((font: GoogleFont) => font.family);
    } catch (error) {
      console.error("Error fetching fonts:", error);
      return [];
    }
  };

  useEffect(() => {
    getFontFamily().then((data) => {
      setFontFamilies(data);
    });
  }, []);

  const renderConfiguration = () => {
    if (!selectedElement) return null;
    switch (selectedElement?.type) {
      case "Frame":
        return <FrameConfiguration selectedElement={selectedElement} />;
      case "Carousel":
        return (
          <CarouselConfiguration
            selectedElement={selectedElement as CarouselElement}
          />
        );
      case "Input":
        return <InputConfiguration selectedElement={selectedElement} />;
      case "Button":
        return <ButtonConfiguration selectedElement={selectedElement} />;
      case "Select":
        return <SelectConfiguration selectedElement={selectedElement} />;
      case "Form":
        return <FormConfiguration selectedElement={selectedElement} />;
      default:
        return (
          <BaseConfiguration
            selectedElement={selectedElement}
            fontFamilies={fontFamilies}
          />
        );
    }
  };

  return (
    <div className="m-2 w-full h-full text-xs">
      <div className="flex flex-col gap-2">
        {!selectedElement && <CanvasColorSelector />}
        <div className="flex flex-row gap-1 mr-4">
          <div className="flex flex-col gap-1">
            <Input
              className="w-full text-xs p-1"
              value={localWidth}
              onChange={handleWidthChange}
            />
            <label className="text-xs">Width</label>
          </div>
          <div className="flex flex-col gap-1">
            <Input
              className="w-full text-xs p-1"
              value={localHeight}
              onChange={handleHeightChange}
            />
            <label className="text-xs">Height</label>
          </div>
        </div>
        {renderConfiguration()}
        <div className="flex flex-row gap-1 mr-4">
          <BorderRadiusInput selectedElement={selectedElement} />
          <BorderWeightPopover selectedElement={selectedElement} />
        </div>
      </div>
    </div>
  );
};

export default Configuration;
