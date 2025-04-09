import { IdCard } from 'lucide-react';
import React from 'react'

type Props = {}

const CardHolder = (props: Props) => {
    const onDragStart = (
        e: React.DragEvent<HTMLDivElement>,
        elementType: string
    ) => {
        e.dataTransfer.setData("advancedType", elementType);
    };
  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, "Card")}
      className="flex flex-row justify-between items-center w-full"
    >
      <div>Card</div>
      <IdCard/>
    </div>
  );
}

export default CardHolder