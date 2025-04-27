import React from "react";
import { motion } from "framer-motion";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./editorcomponents/ListItemComponent";
import { useEditorStore } from "@/lib/store/editorStore";

export default function EditorCanvas({
  projectId,
  setContextMenuPosition,
  setShowContextMenu,
}: {
  projectId: string;
  setContextMenuPosition: React.Dispatch<React.SetStateAction<{ x: number; y: number } | null>>;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const elements = useEditorStore((state) => state.elements);

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