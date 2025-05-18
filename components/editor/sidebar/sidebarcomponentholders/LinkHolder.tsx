import { Link } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const LinkHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Link">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Link")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div className="flex items-center gap-1.5">
          <span>Link</span>
        </div>
        <Link />
      </div>
    </ComponentTooltip>
  );
};

export default LinkHolder;
