import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import React, { useEffect, useState } from "react";
import { Input } from "../../ui/input";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import TextColorInput from "./inputs/TextColorInput";
import BackGroundColorInput from "./inputs/BackGroundColorInput";
import BorderRadiusInput from "./inputs/BorderRadiusInput";
import BorderWeightPopover from "./popovers/BorderWeightPopover";
import FlexDirectionSelect from "./selects/FlexDirectionSelect";
import AlignItemSelect from "./selects/AlignItemSelect";
import JustifyContentSelect from "./selects/JustifyContentSelect";

const Configuration = () => {
  const { elements, dispatch } = useEditorContext();
  const [fontFamilies, setFontFamilies] = useState<string[]>([]);

  const { selectedElement, setSelectedElement } = useEditorContextProvider();
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
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            width: newWidth,
          },
        },
      },
    });
  };

  const handleHeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newHeight = e.currentTarget.value;
    setLocalHeight(newHeight);

    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            height: newHeight,
          },
        },
      },
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

  const handleFontChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    const newFontSize = e.currentTarget.value;
    setLocalFontSize(newFontSize);
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            fontSize: newFontSize,
          },
        },
      },
    });
  };

  return (
    <div className="m-2 w-full h-full  text-xs">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-1 mr-4">
          <div className="flex flex-col gap-1 ">
            <Input
              className="w-full  text-xs p-1"
              value={localWidth}
              onChange={handleWidthChange}
            />
            <label className="text-xs">Width</label>
          </div>
          <div className="flex flex-col gap-1 ">
            <Input
              className="w-full text-xs p-1"
              value={localHeight}
              onChange={handleHeightChange}
            />
            <label className="text-xs">Height</label>
          </div>
        </div>

        {selectedElement?.type !== "Frame" ? (
          <>
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
            <div className="flex flex-row mr-4 gap-1">
              <TextColorInput selectedElement={selectedElement} />
              <BackGroundColorInput selectedElement={selectedElement} />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-1 flex-wrap mr-4">
              <FlexDirectionSelect selectedElement={selectedElement} />
              <AlignItemSelect selectedElement={selectedElement} />
              <JustifyContentSelect selectedElement={selectedElement} />
            </div>
          </>
        )}
        <div className="flex flex-row gap-1 mr-4">
          <BorderRadiusInput selectedElement={selectedElement} />
          <BorderWeightPopover selectedElement={selectedElement} />
        </div>
      </div>
    </div>
  );
};

export default Configuration;
