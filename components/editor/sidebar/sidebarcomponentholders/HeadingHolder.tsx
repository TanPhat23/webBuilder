import { Heading } from "lucide-react";
import React from "react";


const HeadingHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Heading")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Heading</div>
      <Heading />
    </div>
  );
};

export default HeadingHolder;
