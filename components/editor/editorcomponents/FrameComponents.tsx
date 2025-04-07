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

interface commonProps {
  onDoubleClick: (e: React.MouseEvent<HTMLElement>) => void;
  onContextMenu: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  onMouseLeave: (e: React.MouseEvent<HTMLElement>) => void;
  onBlur: (e: React.FormEvent<HTMLElement>) => void;
  contentEditable: boolean;
  suppressContentEditableWarning: boolean;
  className: string;
  dragConstraints: React.RefObject<HTMLDivElement | null>;
  drag: boolean;
  dragMomentum: boolean;
  dragSnapToOrigin: boolean;
  dragElastic: number;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  style: React.CSSProperties;
}

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
    // Basic props that are compatible with Framer Motion
    const commonProps : commonProps= {
      onDoubleClick: (e: React.MouseEvent<HTMLElement>) =>
        handleDoubleClick(e, element),
      onContextMenu: (e: React.MouseEvent<HTMLElement>) =>
        handleContextMenu(e, element),
      onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
        handleMouseEnter(e, element),
      onMouseLeave: (e: React.MouseEvent<HTMLElement>) => handleMouseLeave(e),
      onBlur: (e: React.FormEvent<HTMLElement>) => handleInput(e, element),
      contentEditable: element.isSelected,
      suppressContentEditableWarning: true,
      className: cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
        "z-0": element.id === draggingElement?.id,
        "z-50": element.id !== draggingElement?.id,
      }),
      dragConstraints: dragConstraint,
      drag: !element.isSelected,
      dragMomentum: false,
      dragSnapToOrigin: true,
      dragElastic: 0,
      onDragOver: (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
      },
      style: { ...element.styles },
    };

    const contentProps = {
      dangerouslySetInnerHTML: {
        __html: DOMPurify.sanitize(element.content),
      },
    };

    switch (element.type) {
      case "Frame":
        return (
          <motion.div
            key={element.id}
            {...commonProps}
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(e, element)
            }
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
            {...commonProps}
            {...contentProps}
            onDrop={(e: React.DragEvent<HTMLDivElement>) =>
              handleDrop(e, element)
            }
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
              handleDrop(e as any, element)
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
