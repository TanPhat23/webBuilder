import {
  EditorElement,
  ButtonElement,
  FrameElement,
  EditorAction,
} from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
import { Create } from "../api/element/route";

const commonStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export const listItemStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const createElements = async (
  name: string,
  dispatch: React.Dispatch<EditorAction>,
  parentElement: FrameElement,
  projectId: string
) => {
  const tempId = `${name}-${uuidv4()}`;

  const baseElement = {
    id: tempId,
    content: name,
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      ...commonStyles,
      height: "100%",
      width: "200px",
    },
    parentId: parentElement.id,
  };

  let newElement: EditorElement;

  switch (name) {
    case "Button": {
      newElement = {
        type: "Button",
        ...baseElement,
        styles: {
          ...baseElement.styles,
        },
        projectId: projectId,
      };
      break;
    }

    case "Frame": {
      newElement = {
        type: "Frame",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          height: "200px",
          width: "50%",
          display: "flex",
          backgroundColor: "lightgreen",
          flexDirection: "column",
        },
        elements: [],
        projectId: projectId,
      };
      break;
    }

    default: {
      newElement = {
        type: name,
        ...baseElement,
        projectId: projectId,
      };
      break;
    }
  }

  const parentElementCopy = { ...parentElement };
  parentElementCopy.elements.push(newElement);
  dispatch({
    type: "UPDATE_ELEMENT",
    payload: {
      id: parentElement.id,
      updates: {
        elements: parentElementCopy.elements,
      },
    },
  });
  try {
    await Create(newElement);
  } catch (error) {
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: parentElement.id,
        updates: {
          elements: parentElement.elements.filter(
            (element) => element.id !== newElement.id
          ),
        },
      },
    });
    console.log(error);
  }
};

export default createElements;
