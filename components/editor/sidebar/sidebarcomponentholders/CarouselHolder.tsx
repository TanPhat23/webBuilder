import { Images } from "lucide-react";
import React from "react";
import { ComponentTooltip } from "../../ComponentTooltip";

const CarouselHolder = () => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <ComponentTooltip type="Carousel">
      <div
        draggable
        onDragStart={(e) => onDragStart(e, "Carousel")}
        className="flex flex-row justify-between items-center w-full"
      >
        <div>Carousel</div>
        <Images />
      </div>
    </ComponentTooltip>
  );
};

export default CarouselHolder;
