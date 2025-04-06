import React, { startTransition, useEffect, useState } from "react";
import { Input } from "../../../ui/input";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import TextColorInput from "./inputs/TextColorInput";
import BackGroundColorInput from "./inputs/BackGroundColorInput";
import BorderRadiusInput from "./inputs/BorderRadiusInput";
import BorderWeightPopover from "./popovers/BorderWeightPopover";
import FlexDirectionSelect from "./selects/FrameFlexDirectionSelect";
import AlignItemSelect from "./selects/FrameAlignItemSelect";
import JustifyContentSelect from "./selects/FrameJustifyContentSelect";
import FrameConfiguration from "./FrameConfiguration";
import BaseConfiguration from "./BaseConfiguration";
import CarouselConfiguration from "./CarouselConfiguration";
import { CarouselElement } from "@/lib/type";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

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
    setLocalFontSize(selectedElement?.styles?.fontSize || "");
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
      return data.items.map((font: any) => font.family);
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
        return <CarouselConfiguration />;
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
