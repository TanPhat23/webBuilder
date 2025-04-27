import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./editorcomponents/ListItemComponent";

export default function EditorCanvas({
  elements,
  setElements,
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}: {
  elements: EditorElement[];
  setElements: React.Dispatch<React.SetStateAction<EditorElement[]>>;
  projectId: string;
  setContextMenuPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  useEffect(() => {
    const handleElementUpdate = (e: CustomEvent) => {
      const { id, changes } = e.detail;
      setElements((prevElements) =>
        prevElements.map((element) =>
          element.id === id ? { ...element, ...changes } : element
        )
      );
    };

    document.addEventListener(
      "updateElement",
      handleElementUpdate as EventListener
    );

    return () => {
      document.removeEventListener(
        "updateElement",
        handleElementUpdate as EventListener
      );
    };
  }, [setElements]);

  const renderElement = (element: EditorElement): React.ReactNode => {
    switch (element.type) {
      case "ListItem":
        return (
          <ListItemComponent
            key={element.id}
            element={element}
            projectId={projectId}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
          />
        );
      default:
        return <motion.div key={element.id} />;
    }
  };

  return (
    <div className="editor-canvas">
      {elements.map((element) => renderElement(element))}
    </div>
  );
}