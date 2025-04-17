import { CustomComponent } from "../styleconstants";
import { v4 as uuidv4 } from "uuid";

export const cardComponent: CustomComponent = {
  component: {
    type: "Frame",
    name: "Card",
    id: uuidv4(),
    styles: {
      width: "360px",
      display: "flex",
      backgroundColor: "white",
      flexDirection: "column",
      borderRadius: "12px",
      padding: "24px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
      transition: "all 0.3s ease",
      border: "1px solid #e5e7eb",
      gap: "16px",
      overflow: "hidden",
    },
    elements: [
      {
        type: "Heading",
        name: "Card Title",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "20px",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "4px",
        },
        content: "Card Title",
      },
      {
        type: "Text",
        name: "Card Description",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          fontSize: "16px",
          color: "#6b7280",
          lineHeight: "1.5",
          marginBottom: "16px",
        },
        content:
          "This is a description for the card. You can add details about features, benefits, or any other relevant information here.",
      },
      {
        type: "Button",
        name: "Card Button",
        id: uuidv4(),
        isSelected: false,
        x: 0,
        y: 0,
        styles: {
          padding: "10px 20px",
          backgroundColor: "#4f46e5",
          color: "#ffffff",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          fontWeight: "500",
          fontSize: "15px",
          transition: "background-color 0.2s ease",
          alignSelf: "flex-start",
        },
        content: "Learn More",
      },
    ],
    tailwindStyles:
      "w-[360px] bg-white flex flex-col rounded-xl p-6 shadow-lg border border-gray-200 gap-4 hover:shadow-xl transition-shadow",
    x: 0,
    y: 0,
    isSelected: false,

  },
};
