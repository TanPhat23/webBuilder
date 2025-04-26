import { ClipboardPen } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const FormHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Form">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Form")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Form</div>
        <ClipboardPen />
      </div>
    </ComponentTooltip>
  );
};

export default FormHolder;