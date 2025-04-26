import { MousePointerClick } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const ButtonHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Button">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Button")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Button</div>
        <MousePointerClick />
      </div>
    </ComponentTooltip>
  );
};

export default ButtonHolder;
