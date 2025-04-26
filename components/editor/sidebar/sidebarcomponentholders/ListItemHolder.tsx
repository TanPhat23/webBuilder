import { List } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const ListItemHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="ListItem">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "ListItem")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>ListItem</div>
        <List />
      </div>
    </ComponentTooltip>
  );
};

export default ListItemHolder;
