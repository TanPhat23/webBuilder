import React, { forwardRef } from "react";

type ResizeHandleProps = {
  direction: "nw" | "ne" | "sw" | "se";
  onResizeStart?: (direction: string) => void;
};

const ResizeHandle = forwardRef<HTMLDivElement, ResizeHandleProps>(
  ({ direction, onResizeStart }, ref) => {
    const handleMouseDown = React.useCallback(() => {
      if (onResizeStart) onResizeStart(direction);
    }, [direction, onResizeStart]);

    return (
      <div
        ref={ref}
        className={`resize-handle resize-handle-${direction}`}
        onMouseDown={handleMouseDown}
        style={{
          position: "absolute",
          width: "10px",
          height: "10px",
          background: "white",
          border: "1px solid black",
          borderRadius: "50%",
          ...(direction === "nw" && {
            top: "-5px",
            left: "-5px",
            cursor: "nw-resize",
          }),
          ...(direction === "ne" && {
            top: "-5px",
            right: "-5px",
            cursor: "ne-resize",
          }),
          ...(direction === "sw" && {
            bottom: "-5px",
            left: "-5px",
            cursor: "sw-resize",
          }),
          ...(direction === "se" && {
            bottom: "-5px",
            right: "-5px",
            cursor: "se-resize",
          }),
        }}
      />
    );
  }
);

ResizeHandle.displayName = "ResizeHandle";

export default ResizeHandle;
