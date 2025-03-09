import React, { useOptimistic } from "react";
import { EditorElement, FrameElement } from "@/lib/type";
import { Update } from "@/app/api/element/route";
import { useEditorContext } from "@/lib/context";

export function useOptimisticElement() {
  const { elements, dispatch } = useEditorContext();

  const updateFrameElement = React.useCallback(
    (
      elements: EditorElement[],
      update: { id: string; updates: Partial<EditorElement> }
    ): EditorElement[] => {
      return elements.map((element) => {
        if (element.id === update.id) {
          return { ...element, ...update.updates };
        } else if (
          element.type === "Frame" &&
          (element as FrameElement).elements
        ) {
          return {
            ...element,
            elements: updateFrameElement(
              (element as FrameElement).elements,
              update
            ),
          };
        } else {
          return element;
        }
      });
    },
    []
  );

  const [optimisticElements, addOptimisticUpdate] = useOptimistic(
    elements,
    (state, update: { id: string; updates: Partial<EditorElement> }) => {
      return updateFrameElement(state, update);
    }
  );

  const updateElementOptimistically = async (
    id: string,
    updates: Partial<EditorElement>
  ) => {
    addOptimisticUpdate({ id, updates });

    const updatedElement = findElementById(optimisticElements, id);
    if (!updatedElement) return;

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: { id, updates },
    });
    try {
      const latestElement = { ...updatedElement, ...updates };
      await Update(latestElement);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  const findElementById = (
    elements: EditorElement[],
    id: string
  ): EditorElement | null => {
    for (const element of elements) {
      if (element.id === id) {
        return element;
      } else if (
        element.type === "Frame" &&
        (element as FrameElement).elements
      ) {
        const found = findElementById((element as FrameElement).elements, id);
        if (found) return found;
      }
    }
    return null;
  };

  return {
    optimisticElements,
    updateElementOptimistically,
  };
}
