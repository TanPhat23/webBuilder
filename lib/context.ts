import { createContext, useContext } from "react";
import { EditorAction, EditorElement } from "./type";

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
};

export const EditorContext = createContext<ElementsContextType | null>(null);
export const ImageUploadContext = createContext<ImageUploadContextType | null>(
  null
);
export const SelectedElementProvider =
  createContext<EditorProviderProps | null>(null);

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error("useEditorContext must be used within a EditorProvider");
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
  const context = useContext(SelectedElementProvider);
  if (!context) {
    throw new Error(
      "useEditorContextProvider must be used within a EditorContextProvider"
    );
  }
  return context;
}
