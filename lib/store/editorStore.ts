import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ButtonElement,
  CarouselElement,
  FormElement,
  FrameElement,
  ListElement,
} from "../interface";
import { EditorElement } from "../type";
import { v4 as uuidv4 } from "uuid";


type ContainerElement =
  | FrameElement
  | CarouselElement
  | ListElement
  | FormElement;

const isContainerElement = (
  element: EditorElement
): element is ContainerElement => {
  return (
    (element.type === "Frame" ||
      element.type === "Carousel" ||
      element.type === "Form" ||
      element.type === "ListItem") &&
    Array.isArray((element as ContainerElement).elements)
  );
};

interface EditorState {
  elements: EditorElement[];
  history: EditorElement[][];
  historyIndex: number;
  isLoading: boolean;
  error: string | null;

  // Basic state management
  addElement: (element: EditorElement) => void;
  updateElement: (id: string, updates: Partial<EditorElement>) => void;
  deleteElement: (id: string) => void;
  updateAllElements: (updates: Partial<EditorElement>) => void;
  loadElementsFromDB: (elements: EditorElement[]) => void;
  updateAllSelectedElements: (updates: Partial<EditorElement>) => void;
  undo: () => void;
  redo: () => void;

  // Optimistic update methods
  addElementOptimistically: (
    element: EditorElement,
    projectId: string,
    parentId?: string
  ) => Promise<void>;
  updateElementOptimistically: (
    id: string,
    updates: Partial<EditorElement>
  ) => Promise<void>;
  deleteElementOptimistically: (id: string) => Promise<void>;

  // Helper to update history
  _updateHistory: (newElements: EditorElement[]) => void;

  // Helper to find element by id
  _findElementById: (id: string) => EditorElement | null;
}

export const useEditorStore = create<EditorState>()(
  persist(
    (set, get) => ({
      elements: [],
      history: [[]],
      historyIndex: 0,
      isLoading: false,
      error: null,

      _updateHistory: (newElements) => {
        const { history, historyIndex } = get();
        const newHistory = history.slice(0, historyIndex + 1);
        newHistory.push(newElements);
        set({
          elements: newElements,
          history: newHistory,
          historyIndex: newHistory.length - 1,
        });
      },

      addElement: (element) => {
        const { elements, _updateHistory } = get();
        _updateHistory([...elements, element]);
      },

      updateElement: (id, updates) => {
        const { elements, _updateHistory } = get();

        const updateElement = (element: EditorElement): EditorElement => {
          if (element.id === id) {
            return { ...element, ...updates };
          }

          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement;
            return {
              ...element,
              element: buttonElement.element
                ? (updateElement(buttonElement.element) as FrameElement)
                : undefined,
            };
          }

          if (isContainerElement(element)) {
            return {
              ...element,
              elements: element.elements.map(updateElement),
            };
          }

          return element;
        };

        _updateHistory(elements.map(updateElement));
      },

      deleteElement: (id) => {
        const { elements, _updateHistory } = get();

        const deleteElement = (
          element: EditorElement
        ): EditorElement | null => {
          if (element.id === id) {
            return null;
          }

          // Improved Button element handling with better type safety
          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement;
            const updatedButtonElement = buttonElement.element
              ? deleteElement(buttonElement.element)
              : undefined;

            return {
              ...element,
              element: updatedButtonElement as FrameElement | undefined,
            };
          }

          if (isContainerElement(element)) {
            const updatedElements = element.elements
              .map(deleteElement)
              .filter((el): el is EditorElement => el !== null);

            return {
              ...element,
              elements: updatedElements,
            };
          }

          return element;
        };

        const updatedElements = elements
          .map(deleteElement)
          .filter((el): el is EditorElement => el !== null);

        _updateHistory(updatedElements);
      },

      updateAllElements: (updates) => {
        const { elements, _updateHistory } = get();

        const updateElement = (element: EditorElement): EditorElement => {
          const updatedElement = { ...element, ...updates };

          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement;
            return {
              ...updatedElement,
              element: buttonElement.element
                ? (updateElement(buttonElement.element) as FrameElement)
                : undefined,
            };
          }

          if (isContainerElement(updatedElement)) {
            return {
              ...updatedElement,
              elements: updatedElement.elements.map(updateElement),
            };
          }

          return updatedElement;
        };

        _updateHistory(elements.map(updateElement));
      },

      loadElementsFromDB: (elements) => {
        const { _updateHistory } = get();

        _updateHistory(elements);
      },

      updateAllSelectedElements: (updates) => {
        const { elements, _updateHistory } = get();

        const updateSelectedElement = (
          element: EditorElement
        ): EditorElement => {
          // If this element is selected, update it with the provided updates
          const shouldUpdate = element.isSelected;
          const updatedElement = shouldUpdate
            ? { ...element, ...updates }
            : element;

          // Check for Button with element property
          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement;
            return {
              ...updatedElement,
              element: buttonElement.element
                ? (updateSelectedElement(buttonElement.element) as FrameElement)
                : undefined,
            };
          }

          // Process nested elements regardless of selection status
          if (isContainerElement(updatedElement)) {
            return {
              ...updatedElement,
              elements: updatedElement.elements.map(updateSelectedElement),
            };
          }

          return updatedElement;
        };

        _updateHistory(elements.map(updateSelectedElement));
      },

      undo: () => {
        const { history, historyIndex } = get();
        if (historyIndex > 0) {
          set({
            elements: history[historyIndex - 1],
            historyIndex: historyIndex - 1,
          });
        }
      },

      redo: () => {
        const { history, historyIndex } = get();
        if (historyIndex < history.length - 1) {
          set({
            elements: history[historyIndex + 1],
            historyIndex: historyIndex + 1,
          });
        }
      },

      // Helper to find element by id through the nested structure
      _findElementById: (id) => {
        const { elements } = get();

        const findElement = (
          elements: EditorElement[],
          id: string
        ): EditorElement | null => {
          for (const element of elements) {
            if (element.id === id) {
              return element;
            }

            if (
              element.type === "Button" &&
              (element as ButtonElement).element
            ) {
              const buttonElement = element as ButtonElement;
              if (buttonElement.element) {
                if (buttonElement.element.id === id) {
                  return buttonElement.element;
                }

                if (isContainerElement(buttonElement.element)) {
                  const found = findElement(buttonElement.element.elements, id);
                  if (found) return found;
                }
              }
            }

            if (isContainerElement(element)) {
              const found = findElement(element.elements, id);
              if (found) return found;
            }
          }
          return null;
        };

        return findElement(elements, id);
      },

      // Optimistic update methods
      addElementOptimistically: async (element, projectId, parentId) => {
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
            Type: element.type,
          };

          elementsToCreate.push(newElement);

          if (isContainerElement(element)) {
            return {
              ...newElement,
              elements: element.elements.map((childElement) =>
                prepareElements(childElement, newElement.id)
              ),
            };
          }

          return newElement;
        };

        const preparedElement = prepareElements(element, parentId);
        

        // Immediately update UI
        if (parentId) {
          const childElements = (
            get()._findElementById(parentId) as ContainerElement
          ).elements;
          get().updateElement(parentId, {
            elements: [...(childElements || []), preparedElement],
          });
        } else {
          get().addElement(preparedElement);
        }
        set({ isLoading: true, error: null });

        try {
          const response = await fetch(`/api/element/${projectId}`, {
            method: "POST",
            body: JSON.stringify(preparedElement),
            headers: {
              "Content-Type": "application/json",
            },
          });
          if (!response.ok) {
            throw new Error("Failed to create element");
          }

          set({ isLoading: false });
        } catch (error) {
          console.error("Failed to add element:", error);
          // Rollback on error
          get().deleteElement(preparedElement.id);
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Failed to add element",
          });
        }
      },

      updateElementOptimistically: async (id, updates) => {
        const currentElement = get()._findElementById(id);
        const projectId = currentElement?.projectId;
        if (!currentElement) return;

        // Ensure Type is included
        const completeUpdates = {
          ...updates,
        };

        // Update UI immediately
        get().updateElement(id, completeUpdates);
        set({ isLoading: true, error: null });

        try {
          // Perform API call
          console.log("Project ID:", projectId);
          const updatedElement = { ...currentElement, ...completeUpdates };

          // Update(updatedElement)
          await fetch(`/api/element/${projectId}`, {
            method: "PUT",
            body: JSON.stringify(updatedElement),
            headers: {
              "Content-Type": "application/json",
            },
          });
          set({ isLoading: false });
        } catch (error) {
          console.error("Failed to update element:", error);
          // Rollback to previous state on error
          get().updateElement(id, currentElement);
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to update element",
          });
        }
      },

      deleteElementOptimistically: async (id) => {
        const elementToDelete = get()._findElementById(id);
        if (!elementToDelete) return;

        // Store a copy for potential rollback
        const elementCopy = { ...elementToDelete };

        // Update UI immediately
        get().deleteElement(id);
        set({ isLoading: true, error: null });

        try {
          // Perform API call
          await fetch(`/api/element/${elementToDelete.projectId}`, {
            method: "DELETE",
            body: JSON.stringify({
              id: elementToDelete.id,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          });
          set({ isLoading: false });
        } catch (error) {
          console.error("Failed to delete element:", error);
          // Rollback on error - add the element back
          get().addElement(elementCopy);
          set({
            isLoading: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to delete element",
          });
        }
      },
    }),
    {
      name: "editor-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ elements: state.elements }),
    }
  )
);