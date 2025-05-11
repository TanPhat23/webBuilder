import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  ButtonElement,
  CarouselElement,
  FormElement,
  FrameElement,
  ListElement,
} from "../interface";
import { AnimatedEditorElement, ElementAnimationState } from "../type";
import { v4 as uuidv4 } from "uuid";
import { BatchCreate, Delete, Update } from "@/actions/element/action";
import { EditorElement } from "@/lib/type";

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
  elements: AnimatedEditorElement[];
  history: AnimatedEditorElement[][];
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

  setElementAnimationState: (id: string, animState: ElementAnimationState) => void;
  clearElementAnimationStates: () => void;

  setElementDragging: (id: string, isDragging: boolean) => void;

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

  _updateHistory: (newElements: AnimatedEditorElement[]) => void;

  _findElementById: (id: string) => AnimatedEditorElement | null;
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
        const animatedElement = {
          ...element,
          isEntering: true,
        } as AnimatedEditorElement;
        
        _updateHistory([...elements, animatedElement]);
        setTimeout(() => {
          get().setElementAnimationState(element.id, { isEntering: false });
        }, 300);
      },

      updateElement: (id, updates) => {
        const { elements, _updateHistory } = get();

        const updateElement = (element: AnimatedEditorElement): AnimatedEditorElement => {
          if (element.id === id) {
            return { ...element, ...updates };
          }

          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement & ElementAnimationState;
            return {
              ...element,
              element: buttonElement.element
                ? (updateElement(buttonElement.element as AnimatedEditorElement) as FrameElement & ElementAnimationState)
                : undefined,
            };
          }

          if (isContainerElement(element)) {
            return {
              ...element,
              elements: (element.elements as AnimatedEditorElement[]).map(updateElement),
            };
          }

          return element;
        };

        _updateHistory(elements.map(updateElement));
      },

      deleteElement: (id) => {
        const { elements, _updateHistory } = get();
        
        const updatedElements = elements.map(element => {
          if (element.id === id) {
            return { ...element, isExiting: true };
          }
          return element;
        });
        
        set({ elements: updatedElements });
        
        setTimeout(() => {
          const { elements, _updateHistory } = get();
          
          const deleteElement = (
            element: AnimatedEditorElement
          ): AnimatedEditorElement | null => {
            if (element.id === id) {
              return null;
            }
            
            if (element.type === "Button" && (element as ButtonElement).element) {
              const buttonElement = element as ButtonElement & ElementAnimationState;
              const updatedButtonElement = buttonElement.element
                ? deleteElement(buttonElement.element as AnimatedEditorElement)
                : undefined;

              return {
                ...element,
                element: updatedButtonElement as (FrameElement & ElementAnimationState) | undefined,
              };
            }

            if (isContainerElement(element)) {
              const updatedElements = (element.elements as AnimatedEditorElement[])
                .map(deleteElement)
                .filter((el): el is AnimatedEditorElement => el !== null);

              return {
                ...element,
                elements: updatedElements,
              };
            }

            return element;
          };
          
          const filteredElements = elements
            .map(deleteElement)
            .filter((el): el is AnimatedEditorElement => el !== null);
          
          _updateHistory(filteredElements);
        }, 200);
      },

      updateAllElements: (updates) => {
        const { elements, _updateHistory } = get();

        const updateElement = (element: AnimatedEditorElement): AnimatedEditorElement => {
          const updatedElement = { ...element, ...updates };

          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement & ElementAnimationState;
            return {
              ...updatedElement,
              element: buttonElement.element
                ? (updateElement(buttonElement.element as AnimatedEditorElement) as FrameElement & ElementAnimationState)
                : undefined,
            };
          }

          if (isContainerElement(updatedElement)) {
            return {
              ...updatedElement,
              elements: (updatedElement.elements as AnimatedEditorElement[]).map(updateElement),
            };
          }

          return updatedElement;
        };

        _updateHistory(elements.map(updateElement));
      },

      loadElementsFromDB: (elements) => {
        const animatedElements = elements.map(element => ({
          ...element,
          isEntering: true,
        })) as AnimatedEditorElement[];
        
        get()._updateHistory(animatedElements);
        
        setTimeout(() => {
          get().clearElementAnimationStates();
        }, 300);
      },

      updateAllSelectedElements: (updates) => {
        const { elements, _updateHistory } = get();

        const updateSelectedElement = (
          element: AnimatedEditorElement
        ): AnimatedEditorElement => {
          const shouldUpdate = element.isSelected;
          const updatedElement = shouldUpdate
            ? { ...element, ...updates }
            : element;

          if (element.type === "Button" && (element as ButtonElement).element) {
            const buttonElement = element as ButtonElement & ElementAnimationState;
            return {
              ...updatedElement,
              element: buttonElement.element
                ? (updateSelectedElement(buttonElement.element as AnimatedEditorElement) as FrameElement & ElementAnimationState)
                : undefined,
            };
          }

          if (isContainerElement(updatedElement)) {
            return {
              ...updatedElement,
              elements: (updatedElement.elements as AnimatedEditorElement[]).map(updateSelectedElement),
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
      setElementAnimationState: (id, animState) => {
        const { elements } = get();
        const updatedElements = elements.map(element => {
          if (element.id === id) {
            return { ...element, ...animState };
          }
          return element;
        });
        set({ elements: updatedElements });
      },
      
      clearElementAnimationStates: () => {
        const { elements } = get();
        const updatedElements = elements.map(element => ({
          ...element,
          isEntering: false,
          isExiting: false,
          isDragging: false,
        }));
        set({ elements: updatedElements });
      },
      
      setElementDragging: (id, isDragging) => {
        const { elements } = get();
        const updatedElements = elements.map(element => {
          if (element.id === id) {
            return { ...element, isDragging };
          }
          return element;
        });
        set({ elements: updatedElements });
      },
      addElementOptimistically: async (element, projectId, parentId) => {
        const elementsToCreate: EditorElement[] = [];

        const prepareElements = (
          element: EditorElement,
          parentId?: string
        ): AnimatedEditorElement => {
          const newElement = {
            ...element,
            id: uuidv4(),
            projectId,
            parentId,
            isEntering: true,
          } as AnimatedEditorElement;

          elementsToCreate.push(newElement);

          if (isContainerElement(element)) {
            return {
              ...newElement,
              elements: element.elements.map((childElement) =>
                prepareElements(childElement, newElement.id)
              ),
            } as AnimatedEditorElement;
          }

          return newElement;
        };

        const preparedElement = prepareElements(element, parentId);

        if (parentId) {
          const parentElement = get()._findElementById(parentId) as ContainerElement & ElementAnimationState;
          if (parentElement) {
            const childElements = parentElement.elements as AnimatedEditorElement[];
            get().updateElement(parentId, {
              elements: [...(childElements || []), preparedElement],
            });
          }
        } else {
          get().addElement(preparedElement);
        }
        
        set({ isLoading: true, error: null });

        setTimeout(() => {
          get().setElementAnimationState(preparedElement.id, { isEntering: false });
        }, 300);

        try {
          await BatchCreate(elementsToCreate);
          set({ isLoading: false });
        } catch (error) {
          console.error("Failed to add element:", error);
          get().setElementAnimationState(preparedElement.id, { isExiting: true });
          
          setTimeout(() => {
            get().deleteElement(preparedElement.id);
          }, 200);
          
          set({
            isLoading: false,
            error:
              error instanceof Error ? error.message : "Failed to add element",
          });
        }
      },

      updateElementOptimistically: async (id, updates) => {
        const currentElement = get()._findElementById(id);
        if (!currentElement) return;
        const completeUpdates = {
          ...updates,
        };
        get().updateElement(id, completeUpdates);
        set({ isLoading: true, error: null });

        try {
          const updatedElement = { ...currentElement, ...completeUpdates };
          await Update(updatedElement);
          set({ isLoading: false });
        } catch (error) {
          console.error("Failed to update element:", error);
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

        const elementCopy = { ...elementToDelete };

        get().setElementAnimationState(id, { isExiting: true });
        set({ isLoading: true, error: null });
        setTimeout(async () => {
          get().deleteElement(id);
          
          try {
            await Delete(id);
            set({ isLoading: false });
          } catch (error) {
            console.error("Failed to delete element:", error);
            get().addElement({
              ...elementCopy,
              isEntering: true,
              isExiting: false,
            });
            
            set({
              isLoading: false,
              error:
                error instanceof Error
                  ? error.message
                  : "Failed to delete element",
            });
          }
        }, 200);
      },
      _findElementById: (id) => {
        const { elements } = get();

        const findElement = (
          elements: AnimatedEditorElement[],
          id: string
        ): AnimatedEditorElement | null => {
          for (const element of elements) {
            if (element.id === id) {
              return element;
            }

            if (
              element.type === "Button" &&
              (element as ButtonElement).element
            ) {
              const buttonElement = element as ButtonElement & ElementAnimationState;
              if (buttonElement.element) {
                if (buttonElement.element.id === id) {
                  return buttonElement.element as AnimatedEditorElement;
                }

                if (isContainerElement(buttonElement.element)) {
                  const found = findElement(
                    buttonElement.element.elements as AnimatedEditorElement[], 
                    id
                  );
                  if (found) return found;
                }
              }
            }

            if (isContainerElement(element)) {
              const found = findElement(element.elements as AnimatedEditorElement[], id);
              if (found) return found;
            }
          }
          return null;
        };

        return findElement(elements, id);
      },
    }),
    {
      name: "editor-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ elements: state.elements }),
    }
  )
);
