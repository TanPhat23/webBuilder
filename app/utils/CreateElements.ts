import { EditorAction, EditorElement } from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";
import { Create } from "../api/element/route";

const commonStyles: CSSProperties = {
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

export const createElements = async (
  name: string,
  dispatch: React.Dispatch<EditorAction>,
  x: number,
  y: number,
  projectId: string
) => {
  const tempId = `${name}-${uuidv4()}`;

  const baseElement = {
    id: tempId,
    content: name,
    isSelected: false,
    x,
    y,
    styles: {
      ...commonStyles,
      height: "50px",
      width: "100px",
    },
    projectId: projectId,
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
      };
      break;
    }
    case "Frame": {
      newElement = {
        type: "Frame",
        ...baseElement,
        x: 0,
        y: 0,
        styles: {
          ...baseElement.styles,
          height: "200px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
        },
        elements: [],
      };
      break;
    }
    default: {
      newElement = {
        type: name,
        ...baseElement,
      };
      break;
    }
  }

  dispatch({
    type: "ADD_ELEMENT",
    payload: newElement,
  });

  try {
    await Create(newElement);
  } catch (error) {
    dispatch({
      type: "DELETE_ELEMENT",
      payload: tempId,
    });
    console.error(error);
  }
};
