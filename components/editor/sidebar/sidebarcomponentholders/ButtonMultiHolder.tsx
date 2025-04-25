import React from 'react'


const ButtonMultiHolder = () => {
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("advancedType", "Button Multi")
      }}
      className="flex flex-row justify-between items-center w-full  rounded-md  cursor-grab active:cursor-grabbing transition-colors"
    >
      <div className="font-medium">Button Multi</div>
      
    </div>
  )
}

export default ButtonMultiHolder