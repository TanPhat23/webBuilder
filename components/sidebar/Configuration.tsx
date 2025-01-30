import { useEditorContext } from "@/lib/context";
import React, { use, useEffect } from "react";
import { Input } from "../ui/input";

type Props = {};

const Configuration = (props: Props) => {
  const { elements, dispatch } = useEditorContext();
  const selectedElements = elements.filter((element) => element.isSelected);

  const selectedElement = selectedElements[selectedElements.length - 1];

  const handleWidthChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement?.id,
        updates: {
          styles: { ...selectedElement?.styles, width: e.currentTarget.value },
        },
      },
    });
  };

  const handleHeightChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement?.id,
        updates: {
          styles: { ...selectedElement?.styles, height: e.currentTarget.value },
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
          ></Input>
          <label>Width</label>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            value={selectedElement?.styles?.height || ""}
            onChange={(e) => handleHeightChange(e)}
          ></Input>
          <label>Height</label>
        </div>
      </div>
    </div>
  );
};

export default Configuration;
