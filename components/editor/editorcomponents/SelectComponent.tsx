import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { EditorComponentProps } from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

type Props = EditorComponentProps & {
  parentHandlers?: {
    handleDrop: (
      e: React.DragEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleDoubleClick: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleContextMenu: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;

    getContentProps: (element: EditorElement) => {
      dangerouslySetInnerHTML: { __html: string };
    };
    getCommonProps: (
      element: EditorElement
    ) => React.HTMLAttributes<HTMLElement>;
    draggingElement: EditorElement | null;
  };
};

const SelectComponent = ({
  element,
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
  parentHandlers,
}: Props) => {
  const [clicked, setClicked] = React.useState(false);

  const hookHandlers = useEditorElementHandlers({
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
  });

  const { handleDoubleClick, handleContextMenu, handleDrop, getCommonProps } =
    parentHandlers || hookHandlers;

  const renderOptions = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(element);
    switch (element.type) {
      default:
        return (
          <motion.option {...commonProps}>{element.content}</motion.option>
        );
    }
  };

  return (
    <motion.select
      style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={0}
      drag={!element.isSelected}
      dragMomentum={false}
      dragSnapToOrigin={true}
      dragElastic={0.1}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
    >
      {renderOptions(element)}
    </motion.select>
  );
};

export default SelectComponent;
