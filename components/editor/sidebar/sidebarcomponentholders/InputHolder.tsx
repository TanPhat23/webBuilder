import { FormInput } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const InputHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Input">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Input")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Input</div>
        <FormInput />
      </div>
    </ComponentTooltip>
  );
};

export default InputHolder;
