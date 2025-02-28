import {
  EditorElement,
  ButtonElement,
  FrameElement,
  ListElement,
} from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

const commonStyles: CSSProperties = {
  display:"flex",
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
      height: "100%",
      width: "200px",
    },
  };

  switch (name) {
    case "ListItem": {
      const listElement: ListElement = {
        type: "List",
        ...baseElement,
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
        type: "Button",
        ...baseElement,
        styles: {
          ...baseElement.styles,
        },
      };
      return buttonElement;
    }

    case "Frame": {
      const frameElement: FrameElement = {
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
      };
      return frameElement;
    }

    default: {
      const element: EditorElement = {
        type: name,
        ...baseElement,
      };
      return element;
    }
  }
};

export default createElements;
