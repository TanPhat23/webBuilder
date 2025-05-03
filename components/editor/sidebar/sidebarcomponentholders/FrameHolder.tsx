import { Frame} from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const FrameHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Frame">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Frame")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Frame</div>
        <Frame />
      </div>
    </ComponentTooltip>
  );
};

export default FrameHolder;
