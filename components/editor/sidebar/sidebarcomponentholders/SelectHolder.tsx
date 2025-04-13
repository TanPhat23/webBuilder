import { IdCard, Image, TextSelect } from "lucide-react";
import React from "react";

type Props = {};

const InputHolder = (props: Props) => {
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
      className="flex flex-row justify-between items-center w-full  rounded-md hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Select</div>
      <TextSelect/>
    </div>
  );
};

export default InputHolder;
