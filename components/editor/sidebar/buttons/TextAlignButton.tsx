import { useEditorContext } from "@/lib/context";
import { EditorElement, Element, TextAlign } from "@/lib/type";
import React from "react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  selectedElement: EditorElement | undefined;
};

const alignType = {
  left: { type: "left", icon: <AlignLeft /> },
  center: { type: "center", icon: <AlignCenter /> },
  right: { type: "right", icon: <AlignRight /> },
  justify: { type: "justify", icon: <AlignJustify /> },
};

const TextAlignButton = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const alignmentKeys = Object.keys(alignType) as (keyof typeof alignType)[];
  const [currentAlignmentKey, setCurrentAlignmentKey] =
    React.useState<keyof typeof alignType>("left");

  const handleAlign = () => {
    if (!selectedElement) return;

    const currentAlignment = selectedElement.styles?.textAlign || "left";
    const currentIndex = alignmentKeys.findIndex(
      (key) => alignType[key].type === currentAlignment
    );
    const nextIndex = (currentIndex + 1) % alignmentKeys.length;
    const nextAlignmentKey = alignmentKeys[nextIndex];
    setCurrentAlignmentKey(nextAlignmentKey);

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            textAlign: alignType[nextAlignmentKey].type as TextAlign,
          },
        },
      },
    });
  };

  React.useEffect(() => {
    if (selectedElement) {
      const currentAlignment = selectedElement.styles?.textAlign || "left";
      const currentAlignmentKey = alignmentKeys.find(
        (key) => alignType[key].type === currentAlignment
      );
      if (currentAlignmentKey) {
        setCurrentAlignmentKey(currentAlignmentKey);
      }
    }
  }, [selectedElement]);
  return (
    <Button
      className="bg-white text-black hover:bg-gray-100 h-8 w-8"
      onClick={handleAlign}
    >
      <div className="flex items-center gap-2">
        {alignType[currentAlignmentKey].icon}
      </div>
    </Button>
  );
};

export default TextAlignButton;
