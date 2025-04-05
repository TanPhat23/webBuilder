import React, { startTransition, useState, useEffect } from "react";
import { Input } from "../../../ui/input";
import FontSizeComboBox from "./comboboxes/FontSizeComboBox";
import FontFamilyComboBox from "./comboboxes/FontFamilyComboBox";
import TextAlignButton from "./buttons/TextAlignButton";
import TextStyleButtons from "./buttons/TextStyleButtons";
import TextColorInput from "./inputs/TextColorInput";
import BackGroundColorInput from "./inputs/BackGroundColorInput";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { EditorElement } from "@/lib/type";

type Props = {
  selectedElement: EditorElement;
  fontFamilies: string[];
};

const BaseConfiguration: React.FC<Props> = ({
  selectedElement,
  fontFamilies,
}) => {
  const [localFontSize, setLocalFontSize] = useState(
    selectedElement?.styles?.fontSize || ""
  );
  const { updateElementOptimistically } = useOptimisticElement();

  useEffect(() => {
    setLocalFontSize(selectedElement?.styles?.fontSize || "");
  }, [selectedElement]);

  const handleFontChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    const newFontSize = e.currentTarget.value;
    setLocalFontSize(newFontSize);
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          fontSize: newFontSize,
        },
      });
    });
  };

  return (
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
  );
};

export default BaseConfiguration;
