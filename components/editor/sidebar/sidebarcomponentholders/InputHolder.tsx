import { FormInput } from "lucide-react";
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
      onDragStart={(e) => onDragStart(e, "Input")}
      className="flex flex-row justify-between items-center w-full  rounded-md hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Input</div>
      <FormInput/>
    </div>
  );
};

export default InputHolder;
