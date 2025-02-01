import { useEditorContext } from "@/lib/context";
import React, { useEffect } from "react";
import { Input } from "../ui/input";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import { Button } from "../ui/button";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";

type Props = {};

const Configuration = (props: Props) => {
  const { elements, dispatch } = useEditorContext();
  const [fontFamilies, setFontFamilies] = React.useState<string[]>([]);
  const selectedElements = elements.filter((element) => element.isSelected);

  const selectedElement = selectedElements[selectedElements.length - 1];

  const handleWidthChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              width: e.currentTarget.value,
            },
          },
        },
      });
    });
  };

  const handleHeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              height: e.currentTarget.value,
            },
          },
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

  const handleFontChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              fontSize: e.currentTarget.value,
            },
          },
        },
      });
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
            value={selectedElement?.styles?.fontSize || ""}
            onChange={(e) => handleFontChange(e)}
          />
          <label>Font size</label>
        </div>
        <FontSizeComboBox
          selectedElement={selectedElement}
          selectedElements={selectedElements}
        />
        <div>
          <FontFamilyComboBox
            selectedElement={selectedElement}
            selectedElements={selectedElements}
            fontFamilies={fontFamilies}
          />
          <label>Font Family</label>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <TextAlignButton
          selectedElement={selectedElement}
          selectedElements={selectedElements}
        />
        <TextStyleButtons
          selectedElement={selectedElement}
          selectedElements={selectedElements}
        />
      </div>
      <div className="mt-4">
        <div className="flex flex-row gap-1">
          <Input type="color" />
          <Input type="text" />
        </div>
        <label>Text color</label>
      </div>
    </div>
  );
};

export default Configuration;
