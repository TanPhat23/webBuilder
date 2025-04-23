import { EditorElement } from "@/lib/type";
import { startTransition } from "react";
import { v4 as uuidv4 } from "uuid";

export default function handlePasteElement(
  parsedElement: EditorElement,
  addElementOptimistically: (
    element: EditorElement,
    projectId: string,
    parentId?: string
  ) => Promise<void>,
  setSelectedElement: (element: EditorElement) => void,
  projectId: string,
  selectedElement?: EditorElement
) {
  const newElement = {
    ...parsedElement,
    id: `${parsedElement.type}-${uuidv4()}`,
    x: parsedElement.x,
    y: parsedElement.y,
  };  
  if (
    selectedElement &&
    selectedElement.id !== parsedElement.id &&
    selectedElement.type === "Frame"
  ) {
    newElement.parentId = selectedElement.id;
    newElement.isSelected = false;
    startTransition(() => {
      addElementOptimistically(newElement, projectId, selectedElement.id);
      setSelectedElement(newElement);
    });
  } else {
    startTransition(() => {
      addElementOptimistically(newElement, projectId);
      setSelectedElement(newElement);
    });
  }
}
