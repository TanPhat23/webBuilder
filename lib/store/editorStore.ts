import { create } from "zustand";
import { CarouselElement, EditorElement, FrameElement } from "../type";
import { BatchCreate, Delete, Update } from "@/app/api/element/route";
import { v4 as uuidv4 } from "uuid";

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
  saveElementsToLocalStorage: () => void;
  loadElementsFromLocalStorage: (elements: EditorElement[]) => void;
  updateAllElements: (updates: Partial<EditorElement>) => void;
  loadElementsFromDB: (elements: EditorElement[]) => void;
  updateAllSelectedElements: (updates: Partial<EditorElement>) => void;
  undo: () => void;
  redo: () => void;

  // Optimistic update methods
  addElementOptimistically: (
    element: EditorElement,
    projectId: string
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

export const useEditorStore = create<EditorState>((set, get) => ({
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

      if (element.type === "Frame" && (element as FrameElement).elements) {
        return {
          ...element,
          elements: (element as FrameElement).elements.map(updateElement),
        };
      }
      if (
        element.type === "Carousel" &&
        (element as CarouselElement).elements
      ) {
        return {
          ...element,
          elements: (element as CarouselElement).elements.map(updateElement),
        };
      }

      return element;
    };

    _updateHistory(elements.map(updateElement));
  },

  deleteElement: (id) => {
    const { elements, _updateHistory } = get();

    const deleteElement = (element: EditorElement): EditorElement | null => {
      if (element.id === id) {
        return null;
      }

      if (element.type === "Frame" && (element as FrameElement).elements) {
        const updatedElements = (element as FrameElement).elements
          .map(deleteElement)
          .filter((el): el is EditorElement => el !== null);

        return {
          ...element,
          elements: updatedElements,
        };
      }
      if (
        element.type === "Carousel" &&
        (element as CarouselElement).elements
      ) {
        const updatedElements = (element as CarouselElement).elements
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

  saveElementsToLocalStorage: () => {
    const { elements } = get();
    localStorage.setItem("elements", JSON.stringify(elements));
  },

  loadElementsFromLocalStorage: (elements) => {
    const { _updateHistory } = get();
    _updateHistory(elements);
  },

  updateAllElements: (updates) => {
    const { elements, _updateHistory } = get();

    const updateElement = (element: EditorElement): EditorElement => {
      const updatedElement = { ...element, ...updates };

      if (
        updatedElement.type === "Frame" &&
        (updatedElement as FrameElement).elements
      ) {
        return {
          ...updatedElement,
          elements: (updatedElement as FrameElement).elements.map(
            updateElement
          ),
        };
      }
      if (
        updatedElement.type === "Carousel" &&
        (updatedElement as CarouselElement).elements
      ) {
        return {
          ...updatedElement,
          elements: (updatedElement as CarouselElement).elements.map(
            updateElement
          ),
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

    const updateSelectedElement = (element: EditorElement): EditorElement => {
      // If this element is selected, update it with the provided updates
      if (element.isSelected) {
        const updatedElement = { ...element, ...updates };

        // Process nested elements in Frame elements
        if (
          updatedElement.type === "Frame" &&
          (updatedElement as FrameElement).elements
        ) {
          return {
            ...updatedElement,
            elements: (updatedElement as FrameElement).elements.map(
              updateSelectedElement
            ),
          };
        }

        // Process nested elements in Carousel elements
        if (
          updatedElement.type === "Carousel" &&
          (updatedElement as CarouselElement).elements
        ) {
          return {
            ...updatedElement,
            elements: (updatedElement as CarouselElement).elements.map(
              updateSelectedElement
            ),
          };
        }

        return updatedElement;
      }

      // If element is not selected, still check its children
      // because they might be selected independently
      if (element.type === "Frame" && (element as FrameElement).elements) {
        return {
          ...element,
          elements: (element as FrameElement).elements.map(
            updateSelectedElement
          ),
        };
      }

      if (
        element.type === "Carousel" &&
        (element as CarouselElement).elements
      ) {
        return {
          ...element,
          elements: (element as CarouselElement).elements.map(
            updateSelectedElement
          ),
        };
      }

      return element;
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
        } else if (
          element.type === "Frame" ||
          (element.type === "Carousel" && (element as FrameElement).elements)
        ) {
          const found = findElement((element as FrameElement).elements, id);
          if (found) return found;
        }
      }
      return null;
    };

    return findElement(elements, id);
  },

  // Optimistic update methods
  addElementOptimistically: async (element, projectId) => {
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

    // Immediately update UI
    get().addElement(preparedElement);
    set({ isLoading: true, error: null });

    try {
      // Perform API call
      await BatchCreate(elementsToCreate);
      set({ isLoading: false });
    } catch (error) {
      console.error("Failed to add element:", error);
      // Rollback on error
      get().deleteElement(preparedElement.id);
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Failed to add element",
      });
    }
  },

  updateElementOptimistically: async (id, updates) => {
    const currentElement = get()._findElementById(id);
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
      const updatedElement = { ...currentElement, ...completeUpdates };
      await Update(updatedElement);
      set({ isLoading: false });
    } catch (error) {
      console.error("Failed to update element:", error);
      // Rollback to previous state on error
      get().updateElement(id, currentElement);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to update element",
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
      await Delete(id);
      set({ isLoading: false });
    } catch (error) {
      console.error("Failed to delete element:", error);
      // Rollback on error - add the element back
      get().addElement(elementCopy);
      set({
        isLoading: false,
        error:
          error instanceof Error ? error.message : "Failed to delete element",
      });
    }
  },
}));
