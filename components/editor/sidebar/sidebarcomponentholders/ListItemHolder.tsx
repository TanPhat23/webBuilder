import { List } from "lucide-react";
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
    <div draggable onDragStart={(e) => onDragStart(e, "ListItem")}>
      <List />
    </div>
  );
};

export default ListItemHolder;
