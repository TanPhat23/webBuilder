import { LinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const LinkHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div draggable onDragStart={(e) => onDragStart(e, "A")}>
      <LinkIcon/>
    </div>
  );
};

export default LinkHolder;
