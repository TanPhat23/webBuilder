import React, { startTransition, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import createElements from "@/app/utils/CreateFrameElements";
import { EditorElement, FrameElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { useImageStore } from "@/lib/store/imageStore";

type Props = {
  element: EditorElement;
  setContextMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};

const FrameComponents = ({
  projectId,
  element,
  setShowContextMenu,
  setContextMenuPosition,
}: Props) => {
  const { setSelectedElement } = useElementSelectionStore();
  const { uploadImages } = useImageStore();
  const { updateElement, updateElementOptimistically } = useEditorStore();

  const [hoveredElement, setHoveredElement] = useState<EditorElement | null>(
    null
  );
  const [draggingElement, setDraggingElement] = useState<EditorElement | null>(
    null
  );
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

    updateElement(element.id, {
      elements: frameElements,
    });

    setDraggingElement(null);
    setHoveredElement(null);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertHTML", false, "<br><br>");
    } else if (e.key === " ") {
      e.preventDefault();
      document.execCommand("insertText", false, " ");
    }
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (element.type !== "Image" && element.type !== "Frame") return;
    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;
    createElements(
      elementType,
      null,
      element as FrameElement,
      projectId,
      updateElement
    );
  };

  // Handle double-click to select an element
  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!element.isSelected) setSelectedElement(element);
    updateElement(element.id, {
      isSelected: !element.isSelected,
    });
  };

  const handleInput = (
    e: React.FormEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const newContent = e.currentTarget.innerHTML;
    startTransition(() => {
      updateElementOptimistically(element.id, { content: newContent });
    });
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedElement(element);
    setShowContextMenu(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggingElement || element.isSelected) return;
    setHoveredElement(element);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!draggingElement || element.isSelected) return;
    setHoveredElement(null);
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();

    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];
    console.log(imgSrc);

    if (imgSrc) {
      startTransition(() => {
        updateElementOptimistically(element.id, {
          src: imgSrc,
        });
      });
    }
  };

  // Render all the children
  const renderElement = (element: EditorElement, index: number) => {
    switch (element.type) {
      case "Frame":
        return (
          <motion.div
            key={element.id}
            // style={{ ...element.styles }}
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
            className={cn("", element.tailwindStyles, {
              "border-black border-2 border-solid": element.isSelected,
              "z-0": element.id === draggingElement?.id,
              "z-50": element.id !== draggingElement?.id,
            })}
          >
            {(element as FrameElement).elements?.map((childElement, index) =>
              renderElement(childElement, index)
            )}
          </motion.div>
        );
      case "Button":
        return (
          <motion.div
            key={element.id}
            // style={{ ...element.styles }}
            drag={!element.isSelected}
            dragMomentum={false}
            dragElastic={0}
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
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content),
            }}
            className={cn("", element.tailwindStyles, {
              "border-black border-2 border-solid": element.isSelected,
              "z-0": element.id === draggingElement?.id,
              "z-50": element.id !== draggingElement?.id,
            })}
          />
        );
      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              style={{ ...element.styles }}
              src={element.src}
              drag={element.isSelected}
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
              onDrop={(e) => handleImageDrop(e, element)}
              dragConstraints={dragConstraint}
              onDoubleClick={(e) => handleDoubleClick(e, element)}
              onContextMenu={(e) => handleContextMenu(e, element)}
              onDragOver={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              className={cn("", element.tailwindStyles, {
                "border-black border-2 border-solid": element.isSelected,
              })}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              style={{ ...element.styles }}
              drag={element.isSelected}
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
              onDrop={(e) => handleImageDrop(e, element)}
              className={cn("", element.tailwindStyles, {
                "border-black border-2 border-solid": element.isSelected,
                "z-0": element.id === draggingElement?.id,
                "z-50": element.id !== draggingElement?.id,
              })}
            >
              {element.content}
            </motion.div>
          );
        }
      default:
        return (
          <motion.div
            key={element.id}
            style={{ ...element.styles }}
            className={cn("", element.tailwindStyles, {
              "border-black border-2 border-solid": element.isSelected,
              "z-50": element.id !== draggingElement?.id,
              "z-0": element.id === draggingElement?.id,
            })}
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
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onMouseEnter={(e) => handleMouseEnter(e, element)}
            onMouseLeave={(e) => handleMouseLeave(e)}
            dragConstraints={dragConstraint}
          ></motion.div>
        );
    }
  };

  // Render the root frame element
  return (
    <motion.div
      id={element.id}
      style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      onContextMenu={(e) => handleContextMenu(e, element)}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
      ref={dragConstraint}
    >
      {(element as FrameElement).elements?.map((childElement, index) =>
        renderElement(childElement, index)
      )}
    </motion.div>
  );
};

export default FrameComponents;
