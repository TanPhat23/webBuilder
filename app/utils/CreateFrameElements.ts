import {
  EditorElement,
  ButtonElement,
  FrameElement,
  CarouselElement,
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
  // Keep null as fallback for backward compatibility
  dispatch: null,
  parentElement: FrameElement | CarouselElement,
  projectId: string,
  updateElement?: (id: string, updates: Partial<EditorElement>) => void,
  src?: string
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
        tailwindStyles: "h-10 text-black",
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
    case "Image": {
      newElement = {
        type: "Image",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          height: "100%",
          width: "100%",
        },
        src: src,
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

  // Use the Zustand store if available
  if (updateElement) {
    updateElement(parentElement.id, {
      elements: parentElementCopy.elements,
    });

    try {
      await Create(newElement);
    } catch (error) {
      // Rollback on error
      updateElement(parentElement.id, {
        elements: parentElement.elements.filter(
          (element) => element.id !== newElement.id
        ),
      });
      console.error(error);
    }
  }
};

export default createElements;
