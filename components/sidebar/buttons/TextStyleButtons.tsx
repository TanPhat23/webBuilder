import { Button } from "@/components/ui/button";
import { useEditorContext } from "@/lib/context";
import { Element } from "@/lib/type";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import React from "react";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
};

const TextStyle = [
  { type: "bold", icon: <Bold />, style: "fontWeight" },
  { type: "italic", icon: <Italic />, style: "fontStyle" },
  { type: "underline", icon: <Underline />, style: "textDecoration" },
  { type: "strikethrough", icon: <Strikethrough />, style: "textDecoration" },
  { type: "uppercase", icon: "aA", style: "textTransform" },
];

const TextStyleButtons = ({ selectedElement, selectedElements }: Props) => {
  const { dispatch } = useEditorContext();
  const [activeStyles, setActiveStyles] = React.useState<
    Record<string, boolean>
  >({
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    uppercase: false,
  });

  React.useEffect(() => {
    if (selectedElement) {
      setActiveStyles({
        bold: selectedElement.styles?.fontWeight === "bold",
        italic: selectedElement.styles?.fontStyle === "italic",
        underline: selectedElement.styles?.textDecoration === "underline",
        strikethrough:
          selectedElement.styles?.textDecoration === "line-through",
        uppercase: selectedElement.styles?.textTransform === "uppercase",
      });
    }else{
      setActiveStyles({
        bold: false,
        italic: false,
        underline: false,
        strikethrough: false,
        uppercase: false,
      });
    }
  }, [selectedElement]);

  const handleTextStyle = (type: string, style: string) => {
    let newValue: string;

    switch (type) {
      case "bold":
        newValue = activeStyles.bold ? "normal" : "bold";
        break;
      case "italic":
        newValue = activeStyles.italic ? "normal" : "italic";
        break;
      case "underline":
        newValue = activeStyles.underline ? "none" : "underline";
        break;
      case "strikethrough":
        newValue = activeStyles.strikethrough ? "none" : "line-through";
        break;
      case "uppercase":
        newValue = activeStyles.uppercase ? "none" : "uppercase";
        break;
      default:
        newValue = "none";
    }

    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              [style]: newValue,
            },
          },
        },
      });
    });

    setActiveStyles((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };
  
  return (
    <>
      {TextStyle.map((style) => (
        <Button
          key={style.type}
          className={`bg-white text-black hover:bg-gray-100 ${
            activeStyles[style.type] ? "bg-blue-400" : ""
          }`}
          onClick={() => handleTextStyle(style.type, style.style)}
        >
          {style.icon}
        </Button>
      ))}
    </>
  );
};

export default TextStyleButtons;
