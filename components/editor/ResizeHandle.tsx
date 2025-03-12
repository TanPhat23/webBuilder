import React from 'react';

type ResizeHandleProps = {
  direction: 'nw' | 'ne' | 'sw' | 'se';
  onMouseDown: (direction: 'nw' | 'ne' | 'sw' | 'se') => void;
};

const ResizeHandle: React.FC<ResizeHandleProps> = ({ direction, onMouseDown }) => {
  const getPosition = () => {
    switch (direction) {
      case 'nw': return 'top-[-5px] left-[-5px] cursor-nwse-resize';
      case 'ne': return 'top-[-5px] right-[-5px] cursor-nesw-resize';
      case 'sw': return 'bottom-[-5px] left-[-5px] cursor-nesw-resize';
      case 'se': return 'bottom-[-5px] right-[-5px] cursor-nwse-resize';
    }
  };

  return (
    <div
      className={`absolute w-[10px] h-[10px] bg-blue-500 rounded-full ${getPosition()}`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onMouseDown(direction);
      }}
    />
  );
};

export default ResizeHandle;