import { v4 as uuidv4 } from "uuid";
import { ListElement } from "@/lib/interface";

// ...other imports...

export const createListElement = (position: { x: number; y: number }): ListElement => {
  return {
    id: uuidv4(),
    name: "List",
    type: "ListItem",
    x: position.x,
    y: position.y,
    isSelected: false,
    content: "",
    styles: {},
    tailwindStyles: "",
    bulletStyle: "disc",
    elements: [
      {
        id: uuidv4(),
        name: "Text",
        type: "Text",
        content: "List item 1",
        x: 0,
        y: 0,
        isSelected: false,
        styles: {},
        tailwindStyles: "",
      },
      {
        id: uuidv4(),
        name: "Text",
        type: "Text",
        content: "List item 2",
        x: 0,
        y: 0,
        isSelected: false,
        styles: {},
        tailwindStyles: "",
      },
      {
        id: uuidv4(),
        name: "Text",
        type: "Text",
        content: "List item 3",
        x: 0,
        y: 0,
        isSelected: false,
        styles: {},
        tailwindStyles: "",
      },
    ],
  };
};
