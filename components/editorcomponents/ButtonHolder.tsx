import { Image, MousePointerClick } from "lucide-react";
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
    <div draggable onDragStart={(e) => onDragStart(e, "Button")}>
      <MousePointerClick />
    </div>
  );
};

export default ButtonHolder;
