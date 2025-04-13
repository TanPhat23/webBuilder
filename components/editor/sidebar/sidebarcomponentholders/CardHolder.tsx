import { IdCard } from "lucide-react";
import React from "react";

type Props = {};

const CardHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("advancedType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Card")}
      className="flex flex-row justify-between items-center w-full  rounded-md hover:bg-gray-100 cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Card</div>
      <IdCard className="text-indigo-600"  />
    </div>
  );
};

export default CardHolder;
