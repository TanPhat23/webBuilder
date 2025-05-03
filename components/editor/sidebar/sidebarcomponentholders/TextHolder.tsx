import { TypeIcon } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const TextHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Text">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Text")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Text</div>
        <TypeIcon />
      </div>
    </ComponentTooltip>
  );
};

export default TextHolder;
