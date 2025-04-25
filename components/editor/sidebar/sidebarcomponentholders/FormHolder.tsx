import React from "react";
import { FileText } from "lucide-react";

const FormHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Form")}
      className="flex flex-row justify-between items-center w-full  rounded-md  cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Form</div>
      <FileText className="text-blue-500" />
    </div>
  );
};

export default FormHolder;