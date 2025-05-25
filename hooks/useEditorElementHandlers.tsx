import React, { startTransition, useCallback, useState } from "react";
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
import { customComponents } from "@/lib/customcomponents/styleconstants";

export interface ElementHandlers {
  handleDoubleClick: (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement,
  ) => void;
  handleContextMenu: (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement,
  ) => void;
  handleInput: (
    e: React.FormEvent<HTMLElement>,
    element: EditorElement,
  ) => void;
  handleKeyDown: (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement,
  ) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>, element: EditorElement) => void;
  handleImageDrop: (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement,
  ) => void;
  handleDragStart: (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    element: EditorElement,
    info?: PanInfo,
  ) => void;

  handleDragEnd: (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    info?: PanInfo,
  ) => void;
  swapElements: () => void;
  getContentProps: (element: EditorElement) => {
    dangerouslySetInnerHTML: { __html: string };
  };
  getCommonProps: (
    element: EditorElement,
    dragConstraintRef?: React.RefObject<HTMLDivElement>,
  ) => any;
  hoveredElement: EditorElement | null;
  setHoveredElement: React.Dispatch<React.SetStateAction<EditorElement | null>>;
  draggingElement: EditorElement | null;
  setDraggingElement: React.Dispatch<
    React.SetStateAction<EditorElement | null>
  >;
  dragOverElementId: string | null;
}

export function useEditorElementHandlers({
  element,
  projectId,
  setShowContextMenu,
  setContextMenuPosition,
}: EditorComponentProps): ElementHandlers {
  const { setSelectedElement, selectedElement } = useElementSelectionStore();
  const { uploadImages } = useImageStore();
  const {
    updateElement,
    updateElementOptimistically,
    addElementOptimistically,
  } = useEditorStore();
  const [hoveredElement, setHoveredElement] = useState<EditorElement | null>(
    null,
  );
  const [draggingElement, setDraggingElement] = useState<EditorElement | null>(
    null,
  );
  const [dragOverElementId, setDragOverElementId] = useState<string | null>(
    null,
  );
  const dragOverTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const swapElements = async () => {
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

      // Get elements from the store to find the parent
      const { elements } = useEditorStore.getState();

      // Find the parent container element
      const findParentElement = (
        elements: EditorElement[],
        parentId: string,
      ): EditorElement | undefined => {
        for (const el of elements) {
          if (el.id === parentId) {
            return el;
          }

          if ("elements" in el && Array.isArray(el.elements)) {
            const found = findParentElement(el.elements, parentId);
            if (found) {
              return found;
            }
          }
        }
        return undefined;
      };

      const parentElement = draggingParentId
        ? findParentElement(elements, draggingParentId)
        : undefined;

      if (
        parentElement &&
        "elements" in parentElement &&
        Array.isArray(parentElement.elements)
      ) {
        // Get the parent's elements array
        const parentElements = [...parentElement.elements];

        // Find the indices of the dragging and hovered elements
        const draggingIndex = parentElements.findIndex(
          (el) => el.id === draggingId,
        );
        const hoveredIndex = parentElements.findIndex(
          (el) => el.id === hoveredId,
        );

        if (draggingIndex !== -1 && hoveredIndex !== -1) {
          // Swap the positions in the array
          const temp = parentElements[draggingIndex];
          parentElements[draggingIndex] = parentElements[hoveredIndex];
          parentElements[hoveredIndex] = temp;

          // Update the parent with the new array order
          startTransition(() => {
            updateElement(parentElement.id, {
              elements: parentElements,
            });
          });

          // Call the API to update the backend
          await fetch("/api/element/swap", {
            method: "PUT",
            body: JSON.stringify({
              element: draggingElement,
              targetedElement: hoveredElement,
            }),
          });
        }
      } else {
        // Fallback to swapping properties if container elements array not found
        startTransition(() => {
          updateElement(draggingId, {
            ...hoveredProps,
            id: draggingId,
          });

          updateElement(hoveredId, {
            ...draggingProps,
            id: hoveredId,
          });
        });

        await fetch("/api/element/swap", {
          method: "PUT",
          body: JSON.stringify({
            element: draggingElement,
            targetedElement: hoveredElement,
          }),
        });
      }
    }

    setDraggingElement(null);
    setHoveredElement(null);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    element: EditorElement,
    info?: PanInfo,
  ) => {
    if (e instanceof Event) {
      e.stopPropagation();
    }
    setDraggingElement(element);
  };

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      if (!element.isSelected) {
        setHoveredElement(element);
      }
    },
    [setHoveredElement],
  );
  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      setHoveredElement(null);
    },
    [setHoveredElement],
  );
  const onDragOver = (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement,
  ) => {
    if (
      element.type !== "Frame" &&
      element.type !== "Carousel" &&
      element.type !== "Form" &&
      element.type !== "Select"
    ) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();

    // Update dragOverElementId state instead of modifying the element directly
    setDragOverElementId(element.id);

    // Clear any existing timeout to prevent race conditions
    if (dragOverTimeoutRef.current) {
      clearTimeout(dragOverTimeoutRef.current);
    }

    // Set new timeout to clear the dragover state
    dragOverTimeoutRef.current = setTimeout(() => {
      setDragOverElementId(null);
      dragOverTimeoutRef.current = null;
    }, 300);
  };
  const handleDragEnd = (
    e: React.DragEvent<HTMLElement> | MouseEvent | TouchEvent | PointerEvent,
    info?: PanInfo,
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
    setDragOverElementId(null);

    if (dragOverTimeoutRef.current) {
      clearTimeout(dragOverTimeoutRef.current);
      dragOverTimeoutRef.current = null;
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement,
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
    element: EditorElement,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    // if (element.type !== "Image" && element.type !== "Frame") return;
    const elementType = e.dataTransfer.getData("elementType");
    const advancedType = e.dataTransfer.getData("advancedType");
    const newCustomElement = e.dataTransfer.getData("customElement");

    const imgIdx = e.dataTransfer.getData("image");
    // if (!elementType && !advancedType && !imgIdx && !newCustomElement) return;
    if (elementType) {
      createElements(
        elementType,
        element as FrameElement,
        projectId,
        updateElement,
      );
    } else if (imgIdx) {
      const imgSrc = uploadImages[parseInt(imgIdx)];
      if (imgSrc && element.type !== "Image") {
        createElements(
          imgSrc ? "Image" : elementType,
          element as FrameElement,
          projectId,
          updateElement,
          imgSrc.ufsUrl,
        );
      }
    } else if (advancedType) {
      const advancedElement = advancedComponents.find(
        (el) => el.component.name === advancedType,
      );
      if (!advancedElement) return;
      startTransition(() => {
        addElementOptimistically(
          advancedElement.component as EditorElement,
          projectId,
          element.id,
        );
      });
    } else if (newCustomElement) {
      const customComponent = customComponents.find(
        (component) => component.component.name === newCustomElement,
      );
      if (customComponent) {
        customComponent.component.parentId = element.id;
        startTransition(() => {
          addElementOptimistically(
            customComponent.component as EditorElement,
            projectId,
            element.id,
          );
        });
      }
    }
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!element.isSelected) setSelectedElement(element);
    updateElement(element.id, {
      isSelected: !element.isSelected,
    });
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      setHoveredElement(null);
    };
    if (selectedElement?.id === element.id) {
      setSelectedElement(undefined);
    }
  };

  const handleInput = (
    e: React.FormEvent<HTMLElement>,
    element: EditorElement,
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
    element: EditorElement,
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
    element: EditorElement,
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
    dragConstraintRef?: React.RefObject<HTMLDivElement>,
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
      "border-dashed border-blue-600 border-2":
        element.id === hoveredElement?.id && draggingElement !== null,
      "border-solid border-blue-600 border-2":
        element.id === hoveredElement?.id && draggingElement,
      "border-solid border-black border-2":
        element.id === hoveredElement?.id && !element.isSelected,
      "ring-2 ring-offset-1 ring-blue-400 transition-all":
        element.id === dragOverElementId,
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
    onMouseEnter: (e: React.MouseEvent<HTMLElement>) =>
      handleMouseEnter(e, element),
    onMouseLeave: (e: React.MouseEvent<HTMLElement>) =>
      handleMouseLeave(e, element),
    onDragOver: (e: React.DragEvent<HTMLElement>) => onDragOver(e, element),
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
    dragOverElementId,
  };
}
