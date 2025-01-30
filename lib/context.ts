  import { createContext, useContext } from "react";
  import { EditorAction, Element } from "./type";

  type ElementsContextType = {
    elements: Element[];
    dispatch: React.Dispatch<EditorAction>;
  };

  type ImageUploadContextType = {
    uploadImages :  string[];
    setUploadImages : React.Dispatch<React.SetStateAction<string[]>>;
  }

  export const EditorContext = createContext<ElementsContextType | null>(null);
  export const ImageUploadContext = createContext<ImageUploadContextType | null>(null);

  export function useEditorContext() {
    const context = useContext(EditorContext);

    if (!context) {
      throw new Error(
        "useEditorContext must be used within a EditorContextProvider"
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