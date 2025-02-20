import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import TextColorInput from "./inputs/TextColorInput";
import BackGroundColorInput from "./inputs/BackGroundColorInput";
import BorderRadiusInput from "./inputs/BorderRadiusInput";
import BorderWeightPopover from "./popovers/BorderWeightPopover";

const Configuration = () => {
  const { elements, dispatch } = useEditorContext();
  const [fontFamilies, setFontFamilies] = React.useState<string[]>([]);

  const { selectedElement, setSelectedElement } = useEditorContextProvider();

  const handleWidthChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            width: e.currentTarget.value,
          },
        },
      },
    });
  };

  const handleHeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            height: e.currentTarget.value,
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
    console.log(selectedElement);
  }, []);

  const handleFontChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            fontSize: e.currentTarget.value,
          },
        },
      },
    });
  };

  return (
    <div className="m-4">
      <div className="flex flex-row gap-2">
        <div className="flex flex-col gap-1">
          <Input
            value={selectedElement?.styles?.width || ""}
            onChange={(e) => handleWidthChange(e)}
          />
          <label>Width</label>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            value={selectedElement?.styles?.height || ""}
            onChange={(e) => handleHeightChange(e)}
          />
          <label>Height</label>
        </div>
      </div>
      <div className="flex flex-row gap-1">
        <div>
          <Input
            className="w-[130px]"
            value={selectedElement?.styles?.fontSize || "0"}
            onChange={(e) => handleFontChange(e)}
          />
          <label>Font size</label>
        </div>
        <FontSizeComboBox selectedElement={selectedElement} />
        <div>
          <FontFamilyComboBox
            selectedElement={selectedElement}
            fontFamilies={fontFamilies}
          />
          <label>Font Family</label>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <TextAlignButton selectedElement={selectedElement} />
        <TextStyleButtons selectedElement={selectedElement} />
      </div>
      <div className="flex flex-row mt-4 gap-1">
        <TextColorInput selectedElement={selectedElement} />
        <BackGroundColorInput selectedElement={selectedElement} />
      </div>
      <div className="flex flex-row mt-4 gap-1">
        <BorderRadiusInput selectedElement={selectedElement} />
        <BorderWeightPopover selectedElement={selectedElement} />
      </div>
    </div>
  );
};

export default Configuration;
