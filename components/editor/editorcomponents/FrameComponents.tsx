import React, { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { FrameElement, EditorComponentProps } from "@/lib/interface";
import ButtonComponent from "./ButtonComponent";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./ListItemComponent";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";

const FrameComponents = (props: EditorComponentProps) => {
  const { projectId, element, setShowContextMenu, setContextMenuPosition } =
    props;
  const dragConstraint = useRef<HTMLDivElement>(null);

  const {
    handleKeyDown,
    handleDrop,
    handleDoubleClick,
    handleContextMenu,
    handleImageDrop,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    getContentProps,
    getCommonProps,
    draggingElement,
  } = useEditorElementHandlers(props);

  const renderElement = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(
      element,
      dragConstraint as React.RefObject<HTMLDivElement>
    );
    const contentProps = getContentProps(element);

    switch (element.type) {
      case "Frame":
        return (
          <motion.div
            key={element.id}
            {...commonProps}
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(e, element)
            }
            onDragStart={(e, info) => handleDragStart(e, element, info)}
            onDrag={(e, info) => handleDragOver(e, element, info)}
            onMouseEnter={() => console.log("mouse enter", element.id)}
            onDragEnd={(e, info) => handleDragEnd(e, info)}
          >
            {(element as FrameElement).elements?.map((childElement) => (
              <React.Fragment key={childElement.id}>
                {renderElement(childElement)}
              </React.Fragment>
            ))}
          </motion.div>
        );

      case "Button":
        return (
          <ButtonComponent
            key={element.id}
            element={element}
            commonProps={commonProps}
            draggingElement={draggingElement}
            projectId={projectId}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
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
      case "Select":
        return (
          <SelectComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDrop,
              handleDoubleClick,
              handleContextMenu,
              getContentProps,
              getCommonProps,
              draggingElement,
            }}
          />
        );
      case "Input":
        return (
          <InputComponent
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            commonProps={commonProps}
          />
        );
      case "Link":
        return (
          <motion.a
            key={element.id}
            {...commonProps}
            {...contentProps}
            onKeyDown={(e) => handleKeyDown(e, element)}
            onDrop={(e: React.DragEvent<HTMLAnchorElement>) =>
              handleDrop(e, element)
            }
          />
        );
      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              {...commonProps}
              src={element.src}
              onDrop={(e: React.DragEvent<HTMLImageElement>) =>
                handleImageDrop(e, element)
              }
              drag={element.isSelected}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              {...commonProps}
              onDragStart={(e, info) => handleDragStart(e, element, info)}
              onDrag={(e, info) => handleDragOver(e, element, info)}
              onDragEnd={(e, info) => handleDragEnd(e, info)}
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleImageDrop(e, element)
              }
              drag={element.isSelected}
              {...contentProps}
            />
          );
        }
      default:
        return (
          <motion.div
            key={element.id}
            {...commonProps}
            {...contentProps}
            onKeyDown={(e) => handleKeyDown(e, element)}
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(e, element)
            }
            onDragStart={(e, info) => handleDragStart(e, element, info)}
            onDrag={(e, info) => handleDragOver(e, element, info)}
            onDragEnd={(e, info) => handleDragEnd(e, info)}
          />
        );
    }
  };

  return (
    <motion.div
      id={element.id}
      // style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragStart={(e, info) => handleDragStart(e, element, info)}
      onDragOver={(e) => e.preventDefault()}
      onDragEnd={(e, info) => handleDragEnd(e, info)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
      ref={dragConstraint}
    >
      {(element as FrameElement).elements?.map((childElement) => (
        <React.Fragment key={childElement.id}>
          {renderElement(childElement)}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default FrameComponents;
