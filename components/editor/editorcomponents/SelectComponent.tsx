import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import {
  commonProps,
  EditorComponentProps,
  InputElement,
} from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
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
    getCommonProps: (element: EditorElement) => any;
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
  const {
    handleDoubleClick,
    handleContextMenu,
    handleDrop,
    getContentProps,
    getCommonProps,
  } =
    parentHandlers ||
    useEditorElementHandlers({
      element,
      projectId,
      setContextMenuPosition,
      setShowContextMenu,
    });
  const renderOptions = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(element);
    const contentProps = getContentProps(element);
    switch (element.type) {
      default:
        return <motion.option {...commonProps} {...contentProps} />;
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
