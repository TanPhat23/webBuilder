import React, { startTransition, useState } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { useImageStore } from "@/lib/store/imageStore";
import {
  ButtonElement,
  EditorComponentProps,
  FrameElement,
} from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import createElements from "@/utils/createFrameElements";
import DOMPurify from "dompurify";
import { advancedComponents } from "@/lib/customcomponents/advancedComponents";
import { PanInfo } from "framer-motion";

export interface ElementHandlers {
  handleDoubleClick: (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handleContextMenu: (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handleInput: (
    e: React.FormEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>, element: EditorElement) => void;
  handleImageDrop: (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    element: EditorElement,
    info?: PanInfo
  ) => void;

  handleDragEnd: (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    info?: PanInfo
  ) => void;
  swapElements: () => void;
  getContentProps: (element: EditorElement) => {
    dangerouslySetInnerHTML: { __html: string };
  };
  getCommonProps: (
    element: EditorElement,
    dragConstraintRef?: React.RefObject<HTMLDivElement>
  ) => any;
  hoveredElement: EditorElement | null;
  setHoveredElement: React.Dispatch<React.SetStateAction<EditorElement | null>>;
  draggingElement: EditorElement | null;
  setDraggingElement: React.Dispatch<
    React.SetStateAction<EditorElement | null>
  >;
}

export function useEditorElementHandlers({
  element,
  projectId,
  setShowContextMenu,
  setContextMenuPosition,
}: EditorComponentProps): ElementHandlers {
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

  const swapElements = () => {
    if (!draggingElement || !hoveredElement) return;

    const draggingParentId = draggingElement.parentId;
    const hoveredParentId = hoveredElement.parentId;

    if (draggingParentId === hoveredParentId) {
      const {
        id: draggingId,
        type: draggingType,
        ...draggingProps
      } = draggingElement;
      const {
        id: hoveredId,
        type: hoveredType,
        ...hoveredProps
      } = hoveredElement;

      // Swap everything except ID and type
      startTransition(() => {
        updateElement(draggingId, {
          ...hoveredProps,
          id: draggingId,
        });

        // Update hovered element to have dragging element's properties
        updateElement(hoveredId, {
          ...draggingProps,
          id: hoveredId,
        });
      });
    }

    setDraggingElement(null);
    setHoveredElement(null);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    element: EditorElement,
    info?: PanInfo
  ) => {
    if (e instanceof Event) {
      e.stopPropagation();
    }
    console.log("dragging", element.id);
    setDraggingElement(element);
  };


  const handleMouseEnter = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    if (draggingElement && draggingElement.id !== element.id) {
      setHoveredElement(element);
    }
    console.log(    "hovering", element.id);
    
  };

  const handleDragEnd = (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    info?: PanInfo
  ) => {
    if ("preventDefault" in e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (draggingElement && hoveredElement) {
      swapElements();
    }

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
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // if (element.type !== "Image" && element.type !== "Frame") return;
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

    if (
      element.type === "Button" &&
      (element as ButtonElement).buttonType === "multi"
    ) {
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

    updateElement(element.id, {
      isSelected: true,
    });
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();

    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];

    if (imgSrc) {
      startTransition(() => {
        updateElementOptimistically(element.id, {
          src: imgSrc.ufsUrl,
        });
      });
    }
  };

  const getContentProps = (element: EditorElement) => ({
    dangerouslySetInnerHTML: {
      __html: DOMPurify.sanitize(element.content),
    },
  });

  // Helper function to get common props for elements
  const getCommonProps = (
    element: EditorElement,
    dragConstraintRef?: React.RefObject<HTMLDivElement>
  ) => ({
    onDoubleClick: (e: React.MouseEvent<HTMLElement>) =>
      handleDoubleClick(e, element),
    onContextMenu: (e: React.MouseEvent<HTMLElement>) =>
      handleContextMenu(e, element),
    onBlur: (e: React.FormEvent<HTMLElement>) => handleInput(e, element),
    contentEditable: element.isSelected,
    suppressContentEditableWarning: true,
    className: cn("", element.tailwindStyles, {
      "border-black border-2 border-solid": element.isSelected,
      "-z-50": element.id === draggingElement?.id,
      "z-50": element.id !== draggingElement?.id,
      "opacity-50": element.id === draggingElement?.id,
      "border-dashed border-blue-500 border-2":
        element.id === hoveredElement?.id && draggingElement !== null,
    }),
    dragConstraints: dragConstraintRef,
    drag: !element.isSelected,
    dragMomentum: false,
    dragSnapToOrigin: true,
    dragElastic: 0,
    draggable: true,
    // These are for standard HTML elements (non-Framer Motion)
    onDragStart: (e: React.DragEvent<HTMLElement>) =>
      handleDragStart(e, element),
    onDragEnd: (e: React.DragEvent<HTMLElement>) => handleDragEnd(e),
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) => {
      if (draggingElement?.id !== element.id) {
        setHoveredElement(element);
      }
    },
    
    style: { ...element.styles },
  });

  return {
    handleDoubleClick,
    handleContextMenu,
    handleInput,
    handleKeyDown,
    handleDrop,
    handleImageDrop,
    handleDragStart,
    handleDragEnd,
    swapElements,
    getContentProps,
    getCommonProps,
    hoveredElement,
    setHoveredElement,
    draggingElement,
    setDraggingElement,
  };
}
