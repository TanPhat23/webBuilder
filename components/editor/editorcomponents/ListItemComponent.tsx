import { EditorElement } from "@/lib/type";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import createElements from "@/lib/utils/createFrameElements";
import { useEditorStore } from "@/lib/store/editorStore";
import FrameComponents from "./FrameComponents";
import {
  commonProps,
  EditorComponentProps,
  ListElement,
} from "@/lib/interface";
import DOMPurify from "dompurify";
import ButtonComponent from "./ButtonComponent";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { Trash2 } from "lucide-react"; // Import Trash2 icon for delete button

type Props = EditorComponentProps & {};

const ListItemComponent: React.FC<Props> = ({
  element,
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}) => {
  const { updateElement, deleteElement, deleteElementOptimistically } =
    useEditorStore();
  const { setSelectedElement, selectedElement } = useElementSelectionStore();

  const handleDrop = (
    e: React.DragEvent<HTMLUListElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const elementType = e.dataTransfer.getData("elementType");
    if (!elementType) return;
    if (elementType) {
      createElements(
        elementType,
        element as ListElement,
        projectId,
        updateElement
      );
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

  const handleContextMenu = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Set position for context menu
    setContextMenuPosition({ x: e.clientX, y: e.clientY });

    // Set the specific element that was clicked as the selected element
    setSelectedElement(element);

    // Mark this specific element as selected
    updateElement(element.id, {
      isSelected: true,
    });

    // Show context menu
    setShowContextMenu(true);
  };

  const handleDeleteList = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (element && element.id) {
      deleteElementOptimistically(element.id);
      setSelectedElement(undefined);
    }
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLImageElement | HTMLDivElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (element.type !== "Image") return;
    const src = e.dataTransfer.getData("src");
    if (src) {
      updateElement(element.id, { src });
    }
  };

  const renderElement = (
    element: EditorElement,
    index: number
  ): React.ReactNode => {
    const contentProps = {
      dangerouslySetInnerHTML: {
        __html: DOMPurify.sanitize(element.content),
      },
    };
    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
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
      case "Image":
        if (element.src) {
          return (
            <motion.img
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
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleImageDrop(e, element)
              }
              drag={element.isSelected}
              {...contentProps}
            />
          );
        }
      case "Button":
        return (
          <ButtonComponent
            element={element}
            projectId={projectId}
            draggingElement={null}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
          />
        );
      default:
        return (
          <motion.p
            key={element.id}
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            className={cn(
              element.tailwindStyles,
              element.isSelected && "border-black border-2 border-solid"
            )}
            onDoubleClick={(e) => handleDoubleClick(e, element)}
            onContextMenu={(e) => handleContextMenu(e, element)}
            {...contentProps}
          />
        );
    }
  };

  return (
    <motion.ul
      id={element.id}
      style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
    >
      {(element as ListElement).elements?.map((childElement, index) => (
        <li key={childElement.id}>{renderElement(childElement, index)}</li>
      ))}
    </motion.ul>
  );
};

export default ListItemComponent;
