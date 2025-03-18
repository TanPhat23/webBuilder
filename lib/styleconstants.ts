import { EditorElement } from "./type";
import { v4 as uuidv4 } from "uuid";

interface CustomComponent {
  component: Partial<EditorElement>;
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
      backgroundColor: "black",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    tailwindStyle: "flex flex-row justify-between items-center",
    elements: [
      {
        type: "Link",
        content: "Home",
        id: "",
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "white",
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

const customComponents: CustomComponent[] = [navbarComponent];
