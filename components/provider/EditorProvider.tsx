import React, { useEffect } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { ButtonElement, FrameElement } from "@/lib/interface";

type Props = {
  children: React.ReactNode;
};

const EditorProvider: React.FC<Props> = ({ children }) => {
  const { elements } = useEditorStore();

  const { selectedElement, setSelectedElement } = useElementSelectionStore();

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

          // Check for Frame elements
          if (element.type === "Frame" && element.elements) {
            const foundElement = findAndUpdateSelectedElement(
              element.elements,
              selectedElement
            );
            if (foundElement) {
              return foundElement;
            }
          }

          // Check for Button with nested element
          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement;
            if (buttonElement.element) {
              // Check if the selected element is the button's element itself
              if (buttonElement.element.id === selectedElement.id) {
                return buttonElement.element;
              }

              // Check if the selected element is inside the button's element frame
              if (
                buttonElement.element.type === "Frame" &&
                (buttonElement.element as FrameElement).elements
              ) {
                const foundElement = findAndUpdateSelectedElement(
                  (buttonElement.element as FrameElement).elements,
                  selectedElement
                );
                if (foundElement) {
                  return foundElement;
                }
              }
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
