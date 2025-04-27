import { TextSelect } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const SelectHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Select">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Select")}
        className="flex flex-row justify-between items-center w-full rounded-md cursor-grab active:cursor-grabbing transition-colors"
      >
        <div className="font-medium">Select</div>
        <TextSelect/>
      </div>
    </ComponentTooltip>
  );
};

export default SelectHolder;
