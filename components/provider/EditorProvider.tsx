import React, { useEffect } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useImageStore } from "@/lib/store/imageStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

type Props = {
  children: React.ReactNode;
};

const EditorProvider: React.FC<Props> = ({ children }) => {
  const { elements } = useEditorStore();
  const { loadImagesFromLocalStorage } = useImageStore();
  const { selectedElement, setSelectedElement, loadTourState } =
    useElementSelectionStore();

  // Load images from localStorage on component mount
  useEffect(() => {
    loadImagesFromLocalStorage();
    loadTourState();
  }, [loadImagesFromLocalStorage, loadTourState]);

  // Update selected element when elements change
  useEffect(() => {
    if (selectedElement) {
      const findAndUpdateSelectedElement = (
        elements: any[],
        selectedElement: any
      ): any | undefined => {
        for (const element of elements) {
          if (element.id === selectedElement.id) {
            return element;
          }
          if (element.type === "Frame" && element.elements) {
            const foundElement = findAndUpdateSelectedElement(
              element.elements,
              selectedElement
            );
            if (foundElement) {
              return foundElement;
            }
          }
        }
        return undefined;
      };

      const updatedElement = findAndUpdateSelectedElement(
        elements,
        selectedElement
      );

      if (
        updatedElement &&
        JSON.stringify(updatedElement) !== JSON.stringify(selectedElement)
      ) {
        setSelectedElement(updatedElement);
      }
    }
  }, [elements, selectedElement, setSelectedElement]);

  return <>{children}</>;
};

export default EditorProvider;
