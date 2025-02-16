import {
  EditorElement,
  ButtonElement,
  FrameElement,
  ListElement,
} from "@/lib/type";
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

const createElements = (name: string): EditorElement => {
  const baseElement = {
    id: `${name}-${uuidv4()}`,
    content: name,
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      ...commonStyles,
      height: "50px",
      width: "100px",
    },
  };

  switch (name) {
    case "ListItem": {
      const listElement: ListElement = {
        ...baseElement,
        type: "List",
        styles: {
          display: "flex",
          ...baseElement.styles,
          flexDirection: "column",
        },
        items: [
          {
            content: "Item 1",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
          {
            content: "Item 2",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
          {
            content: "Item 3",
            id: `Item-${uuidv4()}`,
            isSelected: false,
            styles: listItemStyles,
          },
        ],
      };
      return listElement;
    }

    case "Button": {
      const buttonElement: ButtonElement = {
        ...baseElement,
        type: "Button",
        styles: {
          ...baseElement.styles,
        },
      };
      return buttonElement;
    }

    case "Frame": {
      const frameElement: FrameElement = {
        ...baseElement,
        type: "Frame",
        styles: {
          ...baseElement.styles,
          height: "200px",
          width: "50%",
          display: "flex",
          backgroundColor: "lightgreen",
          flexDirection: "column",
        },
        elements: [],
      };
      return frameElement;
    }

    default: {
      const element: EditorElement = {
        ...baseElement,
        type: name,
      };
      return element;
    }
  }
};

export default createElements;
