import { Input } from "@/components/ui/input";
import { EditorElement } from "@/lib/type";
import React, { startTransition, useEffect } from "react";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
type Props = {
  selectedElement: EditorElement | undefined;
};

const BorderRadiusInput = ({ selectedElement }: Props) => {
  const [borderRadius, setBorderRadius] = React.useState<number | string>(0); 
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setBorderRadius(parseInt(e.currentTarget.value));
  };

  const { updateElementOptimistically } =
    useOptimisticElement();

  const handleBlur = () => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          borderRadius: borderRadius,
        },
      });
    });
  };

  useEffect(() => {
    if (selectedElement)
      setBorderRadius(selectedElement?.styles?.borderRadius || "0");
  }, []);
  return (
    <div >
      <Input value={borderRadius} onChange={handleInput} onBlur={handleBlur} />
    </div>
  );
};

export default BorderRadiusInput;
