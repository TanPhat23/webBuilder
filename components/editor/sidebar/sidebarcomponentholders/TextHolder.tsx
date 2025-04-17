import { TypeIcon } from "lucide-react";
import React from "react";


const TextHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Text")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Text</div>
      <TypeIcon />
    </div>
  );
};

export default TextHolder;
