import Image from "next/image";
import React from "react";

type Props = {};

const CarouselHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Carousel")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Carousel</div>
      <Image src="/Carousel.png" alt="Carousel" height={16} width={16}></Image>
    </div>
  );
};

export default CarouselHolder;
