import React, { startTransition, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import createElements from "@/app/utils/CreateFrameElements";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement, FrameElement } from "@/lib/type";

type Props = {
  element: EditorElement;
  setContextMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};

const FrameComponents = React.memo(
  ({
    projectId,
    element,
    setShowContextMenu,
    setContextMenuPosition,
  }: Props) => {
    const { dispatch } = useEditorContext();
    const { setSelectedElement } = useEditorContextProvider();
    const { updateElementOptimistically } = useOptimisticElement();
    const [hoveredElement, setHoveredElement] = useState<EditorElement | null>(
      null
    );
    const [draggingElement, setDraggingElement] =
      useState<EditorElement | null>(null);
    const dragConstraint = useRef<HTMLDivElement>(null);

    const swapElements = () => {
      if (!hoveredElement || !draggingElement || !element) return;

      const frameElements = [...(element as FrameElement).elements];
      const draggedIndex = frameElements.findIndex(
        (el) => el.id === draggingElement.id
      );
      const hoveredIndex = frameElements.findIndex(
        (el) => el.id === hoveredElement.id
      );

      if (draggedIndex === -1 || hoveredIndex === -1) return;

      [frameElements[draggedIndex], frameElements[hoveredIndex]] = [
        frameElements[hoveredIndex],
        frameElements[draggedIndex],
      ];

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            elements: frameElements,
          },
        },
      });

      setDraggingElement(null);
      setHoveredElement(null);
    };

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLElement>, element: EditorElement) => {
        if (e.key === "Enter") {
          e.preventDefault();
          document.execCommand("insertHTML", false, "<br><br>");
        } else if (e.key === " ") {
          e.preventDefault();
          document.execCommand("insertText", false, " ");
        }
      },
      []
    );

    const handleDrop = useCallback(
      (e: React.DragEvent<HTMLDivElement>, element: EditorElement) => {
        e.preventDefault();
        e.stopPropagation();
        const elementType = e.dataTransfer.getData("elementType");
        createElements(
          elementType,
          dispatch,
          element as FrameElement,
          projectId
        );
      },
      [dispatch, projectId]
    );

    // Handle double-click to select an element
    const handleDoubleClick = useCallback(
      (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
        e.preventDefault();
        e.stopPropagation();
        if (!element.isSelected) setSelectedElement(element);
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: element.id,
            updates: {
              isSelected: !element.isSelected,
            },
          },
        });
      },
      [dispatch, setSelectedElement]
    );

    const handleInput = useCallback(
      (e: React.FormEvent<HTMLElement>, element: EditorElement) => {
        e.preventDefault();
        e.stopPropagation();
        const newContent = e.currentTarget.innerHTML;
        startTransition(() => {
          updateElementOptimistically(element.id, { content: newContent });
        });
      },
      [updateElementOptimistically]
    );

    const handleContextMenu = useCallback(
      (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
        e.preventDefault();
        e.stopPropagation();
        setSelectedElement(element);
        setShowContextMenu(true);
        setContextMenuPosition({ x: e.clientX, y: e.clientY });
      },
      [setSelectedElement, setShowContextMenu]
    );

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggingElement || element.isSelected) return;
        setHoveredElement(element);
      },
      [draggingElement]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (!draggingElement || element.isSelected) return;
        setHoveredElement(null);
      },
      [draggingElement, element]
    );

    // Render all the children
    const renderElement = useCallback(
      (element: EditorElement, index: number) => {
        switch (element.type) {
          case "Frame":
            return (
              <motion.div
                key={element.id}
                style={{ ...element.styles }}
                drag={!element.isSelected}
                dragMomentum={false}
                dragSnapToOrigin
                onDragStart={(e) => {
                  e.preventDefault();
                  setDraggingElement(element);
                }}
                onDrop={(e) => handleDrop(e, element)}
                onDragOver={(e) => e.preventDefault()}
                onDragEnd={(e) => {
                  e.preventDefault();
                  swapElements();
                }}
                onMouseEnter={(e) => handleMouseEnter(e, element)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                dragConstraints={dragConstraint}
                onDoubleClick={(e) => handleDoubleClick(e, element)}
                onContextMenu={(e) => handleContextMenu(e, element)}
                className={`${
                  element.isSelected ? "border-black border-2 border-solid" : ""
                } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
              >
                {(element as FrameElement).elements?.map(
                  (childElement, index) => renderElement(childElement, index)
                )}
              </motion.div>
            );
          case "Button":
            return (
              <motion.div
                key={element.id}
                style={{ ...element.styles }}
                drag={!element.isSelected}
                dragMomentum={false}
                dragSnapToOrigin
                onDragStart={(e) => {
                  e.preventDefault();
                  setDraggingElement(element);
                }}
                onDragEnd={(e) => {
                  e.preventDefault();
                  swapElements();
                }}
                onMouseEnter={(e) => handleMouseEnter(e, element)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                whileDrag={{ scale: 0.7 }}
                dragConstraints={dragConstraint}
                onDoubleClick={(e) => handleDoubleClick(e, element)}
                onContextMenu={(e) => handleContextMenu(e, element)}
                className={`${
                  element.isSelected ? "border-black border-2 border-solid" : ""
                } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
              />
            );
          case " Image":
            if (!element.src) {
              return (
                <motion.div
                  key={element.id}
                  style={{ ...element.styles }}
                  drag={!element.isSelected}
                  dragMomentum={false}
                  dragSnapToOrigin
                  onDragStart={(e) => {
                    e.preventDefault();
                    setDraggingElement(element);
                  }}
                  onDragEnd={(e) => {
                    e.preventDefault();
                    swapElements();
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, element)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  dragConstraints={dragConstraint}
                  onDoubleClick={(e) => handleDoubleClick(e, element)}
                  onContextMenu={(e) => handleContextMenu(e, element)}
                  className={`${
                    element.isSelected
                      ? "border-black border-2 border-solid"
                      : ""
                  } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
                >
                  {element.content}
                </motion.div>
              );
            } else {
              return (
                <motion.img
                  key={element.id}
                  style={{ ...element.styles }}
                  src={element.src}
                  drag={!element.isSelected}
                  dragMomentum={false}
                  dragSnapToOrigin
                  onDragStart={(e) => {
                    e.preventDefault();
                    setDraggingElement(element);
                  }}
                  onDragEnd={(e) => {
                    e.preventDefault();
                    swapElements();
                  }}
                  onMouseEnter={(e) => handleMouseEnter(e, element)}
                  onMouseLeave={(e) => handleMouseLeave(e)}
                  dragConstraints={dragConstraint}
                  onDoubleClick={(e) => handleDoubleClick(e, element)}
                  onContextMenu={(e) => handleContextMenu(e, element)}
                  className={`${
                    element.isSelected
                      ? "border-black border-2 border-solid"
                      : ""
                  } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
                />
              );
            }
          default:
            return (
              <motion.div
                key={element.id}
                style={{ ...element.styles }}
                className={`${
                  element.isSelected ? "border-black border-2 border-solid" : ""
                } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
                contentEditable={element.isSelected}
                onContextMenu={(e) => handleContextMenu(e, element)}
                onKeyDown={(e) => handleKeyDown(e, element)}
                suppressContentEditableWarning
                onBlur={(e) => handleInput(e, element)}
                onDoubleClick={(e) => handleDoubleClick(e, element)}
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(element.content),
                }}
                drag={!element.isSelected}
                dragMomentum={false}
                dragSnapToOrigin
                onDragStart={(e) => {
                  e.preventDefault();
                  setDraggingElement(element);
                }}
                onDragEnd={(e) => {
                  e.preventDefault();
                  swapElements();
                }}
                onMouseEnter={(e) => handleMouseEnter(e, element)}
                onMouseLeave={(e) => handleMouseLeave(e)}
                dragConstraints={dragConstraint}
              ></motion.div>
            );
        }
      },
      [
        handleDoubleClick,
        handleKeyDown,
        handleContextMenu,
        handleInput,
        handleMouseEnter,
        handleMouseLeave,
        swapElements,
        draggingElement,
      ]
    );
    // Render the root frame element
    return (
      <motion.div
        id={element.id}
        style={{ ...element.styles }}
        onDrop={(e) => handleDrop(e, element)}
        onDragOver={(e) => e.preventDefault()}
        onContextMenu={(e) => handleContextMenu(e, element)}
        onDoubleClick={(e) => handleDoubleClick(e, element)}
        className={`${
          element.isSelected ? "border-black border-2 border-solid " : ""
        } ${element.id === draggingElement?.id ? "z-0" : "z-50"}`}
        ref={dragConstraint}
      >
        {(element as FrameElement).elements?.map((childElement, index) =>
          renderElement(childElement, index)
        )}
      </motion.div>
    );
  }
);

export default FrameComponents;
