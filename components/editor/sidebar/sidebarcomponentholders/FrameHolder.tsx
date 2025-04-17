import { Frame} from "lucide-react";
import React from "react";


const FrameHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Frame")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Frame</div>
      <Frame />
    </div>
  );
};

export default FrameHolder;
