import { ButtonElement, Element, FrameElement } from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

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

export const createElements = (
  name: string,
  dispatch: Function,
  x: number,
  y: number
) => {
  const baseElement = {
    id: `${name}-${uuidv4()}`,
    content: name,
    isSelected: false,
    x,
    y,
    styles: {
      ...commonStyles,
      height: "50px",
      width: "100px",
    },
  };

  switch (name) {

    case "Button": {
      const buttonElement: ButtonElement = {
        type: "Button",
        ...baseElement,
        styles: {
          ...baseElement.styles,
        },
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: buttonElement,
      });
      break;
    }
    case "Frame": {
      const element: FrameElement = {
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
      dispatch({
        type: "ADD_ELEMENT",
        payload: element,
      });
      break;
    }
    default: {
      const element: Element = {
        type: name,
        ...baseElement,
      };
      dispatch({
        type: "ADD_ELEMENT",
        payload: element,
      });
      break;
    }
  }
};
