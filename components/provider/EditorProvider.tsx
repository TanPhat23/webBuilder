import {
  EditorContext,
  SelectedElementProvider,
  ImageUploadContext,
} from "@/lib/context";
import { elementsReducer } from "@/lib/editorReducer";
import { EditorElement } from "@/lib/type";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const EditorProvider: React.FC<Props> = ({ children }) => {
  const [elements, dispatch] = React.useReducer(elementsReducer, []);
  const [uploadImages, setUploadImages] = React.useState<string[]>([]);
  const [selectedElement, setSelectedElement] = React.useState<EditorElement>();
  
  const editorValue = React.useMemo(() => ({ elements, dispatch }), [elements]);
  const imageUploadValue = React.useMemo(
    () => ({ uploadImages, setUploadImages }),
    [uploadImages]
  );
  const editorProviderValue = React.useMemo(
    () => ({ selectedElement, setSelectedElement }),
    [selectedElement]
  );
  return (
    <EditorContext.Provider value={editorValue}>
        <ImageUploadContext.Provider value={imageUploadValue}>
          <SelectedElementProvider.Provider value={editorProviderValue}>
          {children}
          </SelectedElementProvider.Provider>
        </ImageUploadContext.Provider>
    </EditorContext.Provider>
  );
};

export default EditorProvider;
