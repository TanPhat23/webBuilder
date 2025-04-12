import { Frame, LinkIcon, List } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const ListItemHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "ListItem")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>ListItem</div>
      <List />
    </div>
  );
};

export default ListItemHolder;
