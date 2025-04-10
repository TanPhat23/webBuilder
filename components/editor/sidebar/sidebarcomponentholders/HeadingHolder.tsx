import { Heading, TypeIcon } from "lucide-react";
import React from "react";

type Props = {};

const HeadingHolder = (props: Props) => {
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
