import { Frame, LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const FrameHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div draggable onDragStart={(e) => onDragStart(e, "Frame")}>
      <Frame />
    </div>
  );
};

export default FrameHolder;
