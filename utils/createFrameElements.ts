import { EditorElement } from "@/lib/type";
import {
  FrameElement,
  CarouselElement,
  ListElement,
  FormElement,
} from "@/lib/interface";
import { CSSProperties } from "react";
import { v4 as uuidv4 } from "uuid";

const commonStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "16px",
};

export const listItemStyles: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
};

const createElements = async (
  name: string,
  parentElement: FrameElement | CarouselElement | ListElement | FormElement,
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
        tailwindStyles: "h-10 px-2 py-4 text-black",
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
    case "Form": {
      newElement = {
        type: "Form",
        ...baseElement,
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
        tailwindStyles:
          "flex flex-col p-4 gap-3 min-h-[180px] w-full bg-gray-50 rounded-lg border border-gray-200",
        elements: [],
        formSettings: {
          method: "post",
          autoComplete: "on",
          noValidate: false,
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
    case "ListItem": {
      newElement = {
        type: "ListItem",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          height: "100px",
          width: "100px",
          display: "flex",
          flexDirection: "column",
          fontSize: "16px",
        },
        elements: [
          {
            type: "Text",
            ...baseElement,
            id: `Text-${uuidv4}`,
            content: "Item 1",
            styles: {
              ...baseElement.styles,
              display: "flex",
              fontSize: "16px",
            },
          },
          {
            type: "Text",
            ...baseElement,
            id: `Text2-${uuidv4}`,
            content: "Item 2",
            styles: {
              ...baseElement.styles,
              display: "flex",
              fontSize: "16px",
            },
          },
          {
            type: "Text",
            ...baseElement,
            id: `Text3-${uuidv4}`,
            content: "Item 3",
            styles: {
              ...baseElement.styles,
              display: "flex",
              fontSize: "16px",
            },
          },
        ],
        projectId: projectId,
      };
      break;
    }
    case "Input": {
      newElement = {
        type: "Input",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          height: "100%",
          width: "100%",
        },
        inputSettings: {
          type: "text",
          placeholder: "Enter text",
        },
        projectId: projectId,
      };
      break;
    }
    case "Select": {
      newElement = {
        type: "Select",
        ...baseElement,
        styles: {
          ...baseElement.styles,
          height: "100%",
          width: "100%",
        },

        options: [
          {
            value: "Option 1",
          },
          {
            value: "Option 2",
          },
        ],
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
          height: "300px",
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
  // Make sure elements is defined and accessible
  if (!parentElementCopy.elements) {
    parentElementCopy.elements = [];
  }
  parentElementCopy.elements.push(newElement);

  if (updateElement) {
    updateElement(parentElement.id, {
      elements: parentElementCopy.elements,
    });

    try {
      await fetch(`/api/element/${newElement.projectId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newElement),
      }).then((res) => {
        if (!res.ok) {
          throw new Error("Failed to create element");
        }
      });
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
