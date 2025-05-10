import { Square } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const CardHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Card">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Card")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Card</div>
        <Square />
      </div>
    </ComponentTooltip>
  );
};

export default CardHolder;