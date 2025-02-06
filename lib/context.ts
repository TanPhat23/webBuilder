import { createContext, useContext } from "react";
import { EditorAction, EditorElement, Element } from "./type";

type ElementsContextType = {
  elements: EditorElement[];
  dispatch: React.Dispatch<EditorAction>;
};

type ImageUploadContextType = {
  uploadImages: string[];
  setUploadImages: React.Dispatch<React.SetStateAction<string[]>>;
};

type EditorProviderProps = {
  x : number
  y : number
  selectedElement: Element | undefined;
  onClose: () => void;
};

export const EditorContext = createContext<ElementsContextType | null>(null);
export const ImageUploadContext = createContext<ImageUploadContextType | null>(
  null
);
export const EditorContextProvider = createContext<EditorProviderProps | null>(null);

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "useEditorContext must be used within a EditorProvider"
    );
  }

  return context;
}

export function useImageUploadContext() {
  const context = useContext(ImageUploadContext);

  if (!context) {
    throw new Error(
      "useImageUploadContext must be used within a ImageUploadContextProvider"
    );
  }

  return context;
}

export function useEditorContextProvider() {
  const context = useContext(EditorContextProvider);
  if (!context) {
    throw new Error(
      "useEditorContextProvider must be used within a EditorContextProvider"
    );
  }
  return context
}
