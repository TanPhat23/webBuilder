import React, { startTransition, useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import createElements from "@/lib/utils/createFrameElements";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { useImageStore } from "@/lib/store/imageStore";
import {
  ButtonElement,
  commonProps,
  EditorComponentProps,
  FrameElement,
} from "@/lib/interface";
import { advancedComponents } from "@/lib/customcomponents/advancedComponents";
import ButtonComponent from "./ButtonComponent";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./ListItemComponent";

const FrameComponents = ({
  projectId,
  element,
  setShowContextMenu,
  setContextMenuPosition,
}: EditorComponentProps) => {
  const { setSelectedElement } = useElementSelectionStore();
  const { uploadImages } = useImageStore();
  const {
    updateElement,
    updateElementOptimistically,
    addElementOptimistically,
  } = useEditorStore();

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
    const advancedType = e.dataTransfer.getData("advancedType");
    if (!elementType && !advancedType) return;
    if (elementType) {
      createElements(
        elementType,
        element as FrameElement,
        projectId,
        updateElement
      );
    } else if (advancedType) {
      const advancedElement = advancedComponents.find(
        (el) => el.component.name === advancedType
      );
      if (!advancedElement) return;
      startTransition(() => {
        addElementOptimistically(
          advancedElement.component as EditorElement,
          projectId,
          element.id
        );
      });
    }
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

    // Special handling for multi-button elements
    if (
      element.type === "Button" &&
      (element as ButtonElement).buttonType === "multi"
    ) {
      // Find the content div inside the multi-button
      const contentDiv = e.currentTarget.querySelector("div");
      if (contentDiv) {
        const newContent = contentDiv.innerHTML;
        startTransition(() => {
          updateElementOptimistically(element.id, { content: newContent });
        });
      }
    } else {
      const newContent = e.currentTarget.innerHTML;
      startTransition(() => {
        updateElementOptimistically(element.id, { content: newContent });
      });
    }
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
  const renderElement = (
    element: EditorElement,
    index: number
  ): React.ReactNode => {
    const commonProps: Partial<commonProps> = {
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
            {(element as FrameElement).elements?.map((childElement, index) => (
              <React.Fragment key={childElement.id}>
                {renderElement(childElement, index)}
              </React.Fragment>
            ))}
          </motion.div>
        );
      case "Button":
        return (
          <ButtonComponent
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
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
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
          />
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
      {(element as FrameElement).elements?.map((childElement, index) => (
        <React.Fragment key={childElement.id}>
          {renderElement(childElement, index)}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default FrameComponents;
