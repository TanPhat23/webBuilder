import React, { act, useOptimistic } from "react";
import { EditorAction, EditorElement, FrameElement } from "@/lib/type";
import { BatchCreate, Delete, Update } from "@/app/api/element/route";
import { useEditorContext } from "@/lib/context";
import { v4 as uuidv4 } from "uuid";

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
          (element.type === "Frame" || element.type === "Carousel") &&
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
    (state, action: EditorAction) => {
      switch (action.type) {
        case "ADD_ELEMENT":
          return [...state, action.payload];
        case "DELETE_ELEMENT":
          return state.filter((element) => element.id !== action.payload);
        case "UPDATE_ELEMENT":
          return updateFrameElement(state, action.payload);
        default:
          return state;
      }
    }
  );

  const deleteElementOptimistically = async (id: string) => {
    const elementToDelete = findElementById(elements, id);

    addOptimisticUpdate({ type: "DELETE_ELEMENT", payload: id });

    try {
      await Delete(id);

      dispatch({
        type: "DELETE_ELEMENT",
        payload: id,
      });
    } catch (error) {
      console.error("Failed to delete element:", error);
      if (elementToDelete) {
        addOptimisticUpdate({ type: "ADD_ELEMENT", payload: elementToDelete });
      }
    }
  };

  const addElementOptimistically = async (
    element: EditorElement,
    dispatch: React.Dispatch<EditorAction>,
    projectId: string
  ) => {
    const elementsToCreate: EditorElement[] = [];

    const prepareElements = (
      element: EditorElement,
      parentId?: string
    ): EditorElement => {
      const newElement = {
        ...element,
        id: uuidv4(),
        projectId,
        parentId,
      };

      elementsToCreate.push(newElement);

      if (element.type === "Frame" || element.type === "Carousel") {
        const containerElement = element as FrameElement;
        const childElements = containerElement.elements || [];

        return {
          ...newElement,
          elements: childElements.map((childElement) =>
            prepareElements(childElement, newElement.id)
          ),
        };
      }

      return newElement;
    };

    const preparedElement = prepareElements(element, undefined);

    addOptimisticUpdate({ type: "ADD_ELEMENT", payload: preparedElement });

    try {
      await BatchCreate(elementsToCreate);

      dispatch({
        type: "ADD_ELEMENT",
        payload: preparedElement,
      });
    } catch (error) {
      console.error("Failed to add element:", error);
      addOptimisticUpdate({
        type: "DELETE_ELEMENT",
        payload: preparedElement.id,
      });
    }
  };

  const updateElementOptimistically = async (
    id: string,
    updates: Partial<EditorElement>
  ) => {
    addOptimisticUpdate({ type: "UPDATE_ELEMENT", payload: { id, updates } });

    try {
      const currentElement = findElementById(elements, id);
      if (!currentElement) return;

      const updatedElement = { ...currentElement, ...updates };

      await Update(updatedElement);

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { id, updates },
      });
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
        element.type === "Frame" ||
        (element.type === "Carousel" && (element as FrameElement).elements)
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
    addElementOptimistically,
    deleteElementOptimistically,
  };
}
