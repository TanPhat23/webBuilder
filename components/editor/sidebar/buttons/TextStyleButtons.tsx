import { Button } from "@/components/ui/button";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

import { EditorElement } from "@/lib/type";
import { Bold, Italic, Strikethrough, Underline } from "lucide-react";
import React, { startTransition } from "react";
type Props = {
  selectedElement: EditorElement | undefined;
};

const TextStyle = [
  { type: "bold", icon: <Bold />, style: "fontWeight" },
  { type: "italic", icon: <Italic />, style: "fontStyle" },
  { type: "underline", icon: <Underline />, style: "textDecoration" },
  { type: "strikethrough", icon: <Strikethrough />, style: "textDecoration" },
  { type: "uppercase", icon: "aA", style: "textTransform" },
];

const TextStyleButtons = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useOptimisticElement();
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
    } else {
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
    if (!selectedElement) return;

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
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [style]: newValue,
        },
      });
    });

    console.log(selectedElement.styles);

    setActiveStyles((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  return (
    <div className="flex gap-1">
      {TextStyle.map((style) => (
        <Button
          key={style.type}
          variant="outline"
          size="sm"
          className={`h-8 w-8 ${
            activeStyles[style.type]
              ? "bg-blue-400 text-white hover:bg-blue-500"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => handleTextStyle(style.type, style.style)}
        >
          {style.icon}
        </Button>
      ))}
    </div>
  );
};

export default TextStyleButtons;
