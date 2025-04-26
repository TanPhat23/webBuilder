import { Image } from "lucide-react";
import React from "react";


const ImageHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "ImageHolder")}
      className="flex flex-row justify-between items-center w-full  rounded-md  cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">ImageHolder</div>
      <Image />
    </div>
  );
};

export default ImageHolder;
