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
    [elements]
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
    addOptimisticUpdate({ type: "DELETE_ELEMENT", payload: id });

    dispatch({
      type: "DELETE_ELEMENT",
      payload: id,
    });

    try {
      await Delete(id);
    } catch (error) {
      console.error("Failed to delete element:", error);
      const deletedElement = findElementById(optimisticElements, id);
      if (deletedElement) {
        dispatch({
          type: "ADD_ELEMENT",
          payload: deletedElement,
        });
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

      if (element.type === "Frame") {
        const frameElement = element as FrameElement;
        frameElement.elements = frameElement.elements.map((childElement) =>
          prepareElements(childElement, newElement.id)
        );
      }

      return newElement;
    };

    const preparedElement = prepareElements(element, undefined);
    addOptimisticUpdate({ type: "ADD_ELEMENT", payload: preparedElement });

    dispatch({
      type: "ADD_ELEMENT",
      payload: preparedElement,
    });

    try {
      await BatchCreate(elementsToCreate);
    } catch (error) {
      console.error("Failed to add element:", error);

      dispatch({
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
    addElementOptimistically,
    deleteElementOptimistically,
  };
}
