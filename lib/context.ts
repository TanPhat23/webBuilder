import { createContext, useContext } from "react";
import { EditorAction, Element } from "./type";

type ElementsContextType = {
  elements: Element[];
  dispatch: React.Dispatch<EditorAction>;
};

export const EditorContext = createContext<ElementsContextType | null>(null);

export function useEditorContext() {
  const context = useContext(EditorContext);

  if (!context) {
    throw new Error(
      "useEditorContext must be used within a EditorContextProvider"
    );
  }

  return context;
}
