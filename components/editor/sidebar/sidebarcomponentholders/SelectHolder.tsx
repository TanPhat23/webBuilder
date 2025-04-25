import { TextSelect } from "lucide-react";
import React from "react";



const InputHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Select")}
      className="flex flex-row justify-between items-center w-full  rounded-md  cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Select</div>
      <TextSelect/>
    </div>
  );
};

export default InputHolder;
