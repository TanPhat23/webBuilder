/**
 * @file context.ts
 * This file provides a compatibility layer for components still importing from the old context system.
 * It redirects all context hooks to use the new Zustand stores internally.
 */

import { createContext, useContext } from "react";
import { EditorAction, EditorElement } from "./type";
import { useEditorStore } from "./store/editorStore";
import { useElementSelectionStore } from "./store/elementSelectionStore";
import { useImageStore } from "./store/imageStore";

// Define types to match what existing components expect
type ElementsContextType = {
  elements: EditorElement[];
  dispatch: React.Dispatch<EditorAction>;
};

type ImageUploadContextType = {
  uploadImages: string[];
  setUploadImages: React.Dispatch<React.SetStateAction<string[]>>;
};

type EditorProviderProps = {
  selectedElement: EditorElement | undefined;
  setSelectedElement: React.Dispatch<
    React.SetStateAction<EditorElement | undefined>
  >;
  startTour: boolean;
  setStartTour: (value: boolean) => void;
};

// Create empty contexts for TypeScript compatibility
export const EditorContext = createContext<ElementsContextType | null>(null);
export const ImageUploadContext = createContext<ImageUploadContextType | null>(
  null
);
export const SelectedElementProvider =
  createContext<EditorProviderProps | null>(null);

/**
 * Legacy hook that now uses Zustand editor store internally
 */
export function useEditorContext() {
  const {
    elements,
    updateElement,
    addElement,
    deleteElement,
    loadElementsFromDB,
    updateAllElements,
  } = useEditorStore();

  // Create a compatibility dispatch function
  const dispatch = (action: EditorAction) => {
    switch (action.type) {
      case "ADD_ELEMENT":
        addElement(action.payload);
        break;
      case "UPDATE_ELEMENT":
        updateElement(action.payload.id, action.payload.updates);
        break;
      case "DELETE_ELEMENT":
        deleteElement(action.payload);
        break;
      case "LOAD_ELEMENTS_FROM_DB":
        loadElementsFromDB(action.payload);
        break;
      case "UPDATE_ALL_ELEMENTS":
        updateAllElements(action.payload);
        break;
      default:
        console.warn("Unknown action type:", action.type);
    }
  };

  return { elements, dispatch };
}

/**
 * Legacy hook that now uses Zustand image store internally
 */
export function useImageUploadContext() {
  const { uploadImages, setUploadImages, addImage, removeImage } =
    useImageStore();

  return { uploadImages, setUploadImages };
}

/**
 * Legacy hook that now uses Zustand element selection store internally
 */
export function useEditorContextProvider() {
  const {
    selectedElement,
    setSelectedElement,
    startTour,
    setStartTour,
    toggleTour,
  } = useElementSelectionStore();

  return { selectedElement, setSelectedElement, startTour, setStartTour };
}
