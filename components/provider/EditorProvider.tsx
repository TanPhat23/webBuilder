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
  const [startTour, setStartTour] = React.useState(false);
  const editorValue = React.useMemo(() => ({ elements, dispatch }), [elements]);
  const imageUploadValue = React.useMemo(
    () => ({ uploadImages, setUploadImages }),
    [uploadImages]
  );
  const editorProviderValue = React.useMemo(
    () => ({ selectedElement, setSelectedElement, startTour, setStartTour }),
    [selectedElement, startTour]
  );

  const findAndUpdateSelectedElement = React.useCallback(
    (
      elements: EditorElement[],
      selectedElement: EditorElement
    ): EditorElement | undefined => {
      for (const element of elements) {
        if (element.id === selectedElement.id) {
          return element;
        }
        if (element.type === "Frame" && (element as any).elements) {
          const foundElement = findAndUpdateSelectedElement(
            (element as any).elements,
            selectedElement
          );
          if (foundElement) {
            return foundElement;
          }
        }
      }
      return undefined;
    },
    []
  );
  React.useEffect(() => {
    if (selectedElement) {
      const updatedElement = findAndUpdateSelectedElement(
        elements,
        selectedElement
      );
      if (
        updatedElement &&
        JSON.stringify(updatedElement) !== JSON.stringify(selectedElement)
      ) {
        setSelectedElement(updatedElement);
      }
    }
  }, [elements]);
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
