import { EditorElement } from "@/lib/type";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

const commonStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

export function createElements(
  name: string,
  x: number,
  y: number,
  projectId: string,
  addElementOptimistically?: (
    element: EditorElement,
    projectId: string
  ) => Promise<void>
) {
  const tempId = `${name}-${uuidv4()}`;
  const baseElement = {
    id: tempId,
    content: name,
    isSelected: false,
    x: x,
    y: y,
    styles: {
      ...commonStyles,
      height: "100px",
      width: "200px",
    },
  };

  let newElement: EditorElement;

  switch (name) {
    case "Text": {
      newElement = {
        type: "Text",
        ...baseElement,
        content: "Edit text double clicking",
        styles: {
          ...baseElement.styles,
          display: "flex",
          width: "70%",
          fontSize: "16px",
        },
        projectId: projectId,
      };
      break;
    }
    case "Button": {
      newElement = {
        type: "Button",
        buttonType: "primary",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          padding: "8px 16px",
          backgroundColor: "#0070f3",
          color: "#ffffff",
          borderRadius: "4px",
          border: "none",
          cursor: "pointer",
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
        x: 0,
        styles: {
          ...baseElement.styles,
          minHeight: "100px",
          width: "100%",
          display: "flex",
          backgroundColor: "white",
        },
        elements: [],
        projectId: projectId,
      };
      break;
    }
    case "ListItem": {
      newElement = {
        type: "ListItem",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          display: "flex",
          flexDirection: "column",
          width: "100%",
        },
        elements: [],
        projectId: projectId,
      };
      break;
    }
    case "Link": {
      newElement = {
        type: "Link",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer",
        },
        href: "#",
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
          objectFit: "cover",
        },
        projectId: projectId,
      };
      break;
    }
    case "Carousel": {
      newElement = {
        type: "Carousel",
        ...baseElement,
        x: 0,
        styles: {
          width: "100%",
          height: "300px",
        },
        carouselSettings: {
          dots: true,
          infinite: true,
          arrows: true,
          speed: 500,
          autoplay: false,
          autoplaySpeed: 3000,
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: true,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
          ],
        },
        elements: [],
        projectId: projectId,
      };
      break;
    }
    case "Form": {
      newElement = {
        type: "Form",
        ...baseElement,
        x: 0,
        styles: {
          ...baseElement.styles,
          display: "flex",
          flexDirection: "column",
          padding: "16px",
          gap: "12px",
          minHeight: "180px",
          width: "100%",
          backgroundColor: "#f9fafb",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
        },
        tailwindStyles: "flex flex-col p-4 gap-3 min-h-[180px] w-full bg-gray-50 rounded-lg border border-gray-200",
        elements: [],
        formSettings: {
          method: "post",
          autoComplete: "on",
          noValidate: false
        },
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

  // Use Zustand store method if provided
  if (addElementOptimistically) {
    addElementOptimistically(newElement, projectId);
  }
}
