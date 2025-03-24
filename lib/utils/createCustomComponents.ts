import { BatchCreate } from "@/app/api/element/route";
import { EditorAction, EditorElement, FrameElement } from "../type";
import { v4 as uuidv4 } from "uuid";

export const CreateCustomComponents = async (
  element: EditorElement,
  dispatch: React.Dispatch<EditorAction>,
  projectId: string
) => {
  dispatch({
    type: "ADD_ELEMENT",
    payload: {
      ...element,
      id: uuidv4(),
      projectId,
    },
  });

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
    };

    
    elementsToCreate.push(newElement);

    if (element.type === "Frame") {
      const frameElement = element as FrameElement;
      frameElement.elements = frameElement.elements.map((childElement) =>
        prepareElements(childElement, newElement.id)
      );
    }

    return newElement;
  };

  try {
    prepareElements(element, undefined);

    await BatchCreate(elementsToCreate);
  } catch (err) {
    console.error("Failed to create custom components:", err);

    dispatch({
      type: "DELETE_ELEMENT",
      payload: element.id,
    });

    return false;
  }
};
