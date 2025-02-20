import { Input } from "@/components/ui/input";
import { useEditorContext } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import React, { useEffect } from "react";

type Props = {
  selectedElement: EditorElement | undefined;
};

const BorderRadiusInput = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const [borderRadius, setBorderRadius] = React.useState<number | string>(0);
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setBorderRadius(parseInt(e.currentTarget.value));
  };

  const handleBlur = () => {
    if (!selectedElement) return;
    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            borderRadius: borderRadius,
          },
        },
      },
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
