import React from "react";

type Props = {};

const TextHolder = (props: Props) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    elementType: string
  ) => {
    e.dataTransfer.setData("elementType", elementType);
  };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Text")}
    >
      Text
    </div>
  );
};

export default TextHolder;
