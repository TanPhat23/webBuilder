import { useEditorContext } from "@/lib/context";
import { Element, TextAlign } from "@/lib/type";
import React from "react";
import { AlignCenter, AlignJustify, AlignLeft, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
};

const alignType = {
  left: { type: "left", icon: <AlignLeft /> },
  center: { type: "center", icon: <AlignCenter /> },
  right: { type: "right", icon: <AlignRight /> },
  justify: { type: "justify", icon: <AlignJustify /> },
};

const TextAlignButton = ({ selectedElement, selectedElements }: Props) => {
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
    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              textAlign: alignType[nextAlignmentKey].type as TextAlign,
            },
          },
        },
      });
    });
    // setTimeout(() => {
    //   selectedElements.forEach((element) => {
    //     console.log(element.styles?.textAlign);
    //   });
    // }, 1000);
    setCurrentAlignmentKey(nextAlignmentKey);
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
      className="bg-white text-black hover:bg-gray-100"
      onClick={handleAlign}
    >
      <div className="flex items-center gap-2">
        {alignType[currentAlignmentKey].icon}
      </div>
    </Button>
  );
};

export default TextAlignButton;
