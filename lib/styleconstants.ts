import { EditorElement } from "./type";
import { v4 as uuidv4 } from "uuid";

export interface CustomComponent {
  component: EditorElement;
}

const navbarComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "NavBar",
    id: "",
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      height: "50px",
      width: "100%",
      backgroundColor: "white",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
    tailwindStyle: "flex flex-row items-center w-full",
    elements: [
      {
        type: "Link",
        content: "Home",
        id: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "black",
          margin: "0 10px",
        },
        tailwindStyle: "m-0",
        href: "/",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "About",
        id: "2",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "black",
          margin: "0 10px",
        },
        tailwindStyle: "m-0",
        href: "/",
        src: "",
        parentId: "",
        projectId: "",
      },
    ],
    href: "",
    src: "",
    parentId: "",
    projectId: "",
  },
};

export const customComponents: CustomComponent[] = [navbarComponent];
