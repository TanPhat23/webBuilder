import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ListElement, EditorComponentProps } from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import ButtonComponent from "./ButtonComponent";
import FrameComponents from "./FrameComponents";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { useEditorStore } from "@/lib/store/editorStore";

type ListItemProps = EditorComponentProps & {
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
    handleImageDrop: (
      e: React.DragEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    getContentProps: (element: EditorElement) => {
      dangerouslySetInnerHTML: { __html: string };
    };
    getCommonProps: (element: EditorElement) => unknown;
    draggingElement: EditorElement | null;
  };
};

const ListItemComponent = (props: ListItemProps) => {
  const {
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
    parentHandlers,
  } = props;

  const hookHandlers = useEditorElementHandlers(props);

  const {
    handleDoubleClick,
    handleContextMenu,
    handleDrop,
    handleImageDrop,
    getContentProps,
    getCommonProps,
    draggingElement,
  } = parentHandlers || hookHandlers;

  const renderElement = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(element);
    const contentProps = getContentProps(element);
    const {elements, updateElement} = useEditorStore()
    updateElement(element.id, {
      
    })
    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );
      case "ListItem":
        return (
          <ListItemComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDrop,
              handleDoubleClick,
              handleContextMenu,
              handleImageDrop,
              getContentProps,
              getCommonProps,
              draggingElement,
            }}
          />
        );
      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              src={element.src}
              onDrop={(e: React.DragEvent<HTMLImageElement>) =>
                handleImageDrop(e, element)
              }
              {...commonProps}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleImageDrop(e, element)
              }
              {...commonProps}
              {...contentProps}
            />
          );
        }
      case "Button":
        return (
          <ButtonComponent
            key={element.id}
            element={element}
            projectId={projectId}
            draggingElement={draggingElement}
            commonProps={commonProps}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
          />
        );
      default:
        return <motion.p key={element.id} {...commonProps} {...contentProps} />;
    }
  };

  return (
    <motion.ul
      id={element.id}
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
      {(element as ListElement).elements?.map((childElement) => (
        <li key={childElement.id}>{renderElement(childElement)}</li>
      ))}
    </motion.ul>
  );
};

export default ListItemComponent;
