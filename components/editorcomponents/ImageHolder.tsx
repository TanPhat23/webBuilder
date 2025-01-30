import { Image } from "lucide-react";
import React from "react";

type Props = {};

const ImageHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div draggable onDragStart={(e) => onDragStart(e, "Image")}>
      <Image />
    </div>
  );
};

export default ImageHolder;
