import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";

export const headerComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "Header",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      height: "70px",
      width: "100%",
      backgroundColor: "#e3f2fd",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    tailwindStyles:
      "flex flex-col md:flex-row items-center justify-between w-full h-[70px] p-4 bg-blue-100 shadow-md gap-2 md:gap-0",
    elements: [
      {
        type: "Text",
        content: "My Portfolio",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#0d47a1",
          fontSize: "28px",
          fontWeight: "bold",
        },
        tailwindStyles: "text-blue-900 text-3xl font-bold text-center md:text-left",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Home",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#0d47a1",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-blue-900 text-lg text-center md:text-left hover:text-blue-700 hover:underline transition-all",
        href: "/",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Projects",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#0d47a1",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-blue-900 text-lg text-center md:text-left hover:text-blue-700 hover:underline transition-all",
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

export const headerComponent2: CustomComponent = {
  component: {
    type: "Frame",
    name: "Header2",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      height: "70px",
      width: "100%",
      backgroundColor: "#343a40",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: "0 20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    tailwindStyles:
      "flex flex-col md:flex-row items-center justify-center w-full p-4 bg-gray-900 shadow-md gap-2 md:gap-0",
    elements: [
      {
        type: "Text",
        content: "Brothers Inc",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "white",
          fontSize: "28px",
          fontWeight: "bold",
        },
        tailwindStyles: "text-white text-3xl font-bold text-center md:text-left",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Home",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "white",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-white text-lg text-center md:text-left hover:text-gray-300 transition-colors",
        href: "/",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Portfolio",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "white",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-white text-lg text-center md:text-left hover:text-gray-300 transition-colors",
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

export const headerComponent3: CustomComponent = {
  component: {
    type: "Frame",
    name: "Header3",
    id: uuidv4(),
    content: "",
    isSelected: false,
    x: 0,
    y: 0,
    styles: {
      height: "80px",
      width: "100%",
      backgroundColor: "#4caf50",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      padding: "0 20px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    tailwindStyles:
      "flex flex-col md:flex-row items-center justify-start w-full p-4 bg-green-500 shadow-md gap-2 md:gap-0",
    elements: [
      {
        type: "Text",
        content: "Welcome to My Site",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#1b5e20",
          fontSize: "28px",
          fontWeight: "bold",
        },
        tailwindStyles: "text-green-900 text-3xl font-bold text-center md:text-left",
        href: "",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Home",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#1b5e20",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-green-900 text-lg text-center md:text-left hover:text-green-700 transition-colors",
        href: "/",
        src: "",
        parentId: "",
        projectId: "",
      },
      {
        type: "Link",
        content: "Pricing",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          color: "#1b5e20",
          margin: "0 10px",
          fontSize: "18px",
        },
        tailwindStyles: "m-2 text-green-900 text-lg text-center md:text-left hover:text-green-700 transition-colors",
        href: "/articles",
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