import { Image } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const ImageHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Image">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Image")}
        className="flex flex-row justify-between items-center w-full rounded-md cursor-grab active:cursor-grabbing transition-colors"
      >
        <div className="font-medium">Image</div>
        <Image />
      </div>
    </ComponentTooltip>
  );
};

export default ImageHolder;
