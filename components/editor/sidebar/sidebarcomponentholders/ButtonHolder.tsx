import { MousePointerClick } from "lucide-react";
import React from "react";

type Props = {};

const ButtonHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Button")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Button</div>
      <MousePointerClick />
    </div>
  );
};

export default ButtonHolder;
