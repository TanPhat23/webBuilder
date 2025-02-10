import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/lib/context";
import { Element } from "@/lib/type";
import { Radius } from "lucide-react";
import React, { useEffect } from "react";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
};

const BorderRadiusInput = ({ selectedElement, selectedElements }: Props) => {
  const { dispatch } = useEditorContext();
  const [borderRadius, setBorderRadius] = React.useState<number | string>(0);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setBorderRadius(parseInt(e.currentTarget.value));
  };

  const handleBlur = () => {
    if (!selectedElement) return;
    selectedElements.forEach((element) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            styles: {
              ...element.styles,
              borderRadius: borderRadius,
            },
          },
        },
      });
    });
  };

  useEffect(() => {
    if (selectedElement)
      setBorderRadius(selectedElement?.styles?.borderRadius || "0");
  }, []);
  return (
    <div>
      <Input value={borderRadius} onChange={handleInput} onBlur={handleBlur} />
    </div>
  );
};

export default BorderRadiusInput;
