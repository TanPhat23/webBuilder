import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { EditorComponentProps, SelectElement } from "@/lib/interface";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { startTransition } from "react";

type Props = EditorComponentProps & {
  parentHandlers?: {
    handleDoubleClick: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleContextMenu: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;

    getCommonProps: (
      element: EditorElement
    ) => React.HTMLAttributes<HTMLElement>;
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
  const hookHandlers = useEditorElementHandlers({
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
  });

  const { handleDoubleClick, handleContextMenu } =
    parentHandlers || hookHandlers;

  const selectElement = element as SelectElement;
  const selectSettings = selectElement.selectSettings || {};
  const options = selectElement.options || [];
  const { updateElementOptimistically } = useEditorStore();

  const handleDrop = (e: React.DragEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const data = e.dataTransfer.getData("text/plain");
    if (data === "Text") {
      console.log("Text dropped");
      
      startTransition(() => {
        updateElementOptimistically(element.id, {
          options: [
            ...options,
            {
              value: `option-${options.length + 1}`,
              text: `Option ${options.length + 1}`,
            },
          ],
        });
      });
    } else {
      return;
    }
  };

  return (
    <motion.select
      style={{ ...element.styles }}
      onDragOver={(e) => e.preventDefault()}
      tabIndex={1}
      onDrop={handleDrop}
      onClick={(e) => e.stopPropagation()}
      onDrag={(e) => e.preventDefault()}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      onContextMenu={(e) => handleContextMenu(e, element)}
      className={cn("", element.tailwindStyles, {
        "border-black border-2 border-solid": element.isSelected,
      })}
      multiple={selectSettings.multiple}
      disabled={selectSettings.disabled}
      size={selectSettings.size}
    >
      {options &&
        options.length > 0 &&
        options.map((option, index) => (
          <motion.option
            key={`option-${index}`}
            value={option.value || "default"}
            selected={option.selected || false}
            disabled={option.disabled || false}
          >
            {option.text || option.value || `Option ${index + 1}`}
          </motion.option>
        ))}
    </motion.select>
  );
};

export default SelectComponent;
