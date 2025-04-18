import { LinkIcon } from "lucide-react";
import React from "react";


const LinkHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Link")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Link</div>
      <LinkIcon />
    </div>
  );
};

export default LinkHolder;
