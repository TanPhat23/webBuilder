import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FramePaddingControls = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useOptimisticElement();

  const paddingTop = selectedElement?.styles?.paddingTop || "0px";
  const paddingRight = selectedElement?.styles?.paddingRight || "0px";
  const paddingBottom = selectedElement?.styles?.paddingBottom || "0px";
  const paddingLeft = selectedElement?.styles?.paddingLeft || "0px";

  const handlePaddingChange = (value: string, position: string) => {
    if (!selectedElement) return;

    // Add 'px' if the user only entered a number
    let formattedValue = value;
    if (value && /^\d+$/.test(value)) {
      formattedValue = `${value}px`;
    }

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          [`padding${position}`]: formattedValue,
        },
      });
    });
  };

  return (
    <div className="space-y-2">
      <Label className="text-xs text-muted-foreground">Padding</Label>
      <div className="grid grid-cols-4 gap-2">
        <div>
          <Label className="text-[10px]">Top</Label>
          <Input
            className="h-8 text-xs"
            value={String(paddingTop).replace("px", "")}
            onChange={(e) => handlePaddingChange(e.target.value, "Top")}
            placeholder="0"
          />
        </div>
        <div>
          <Label className="text-[10px]">Right</Label>
          <Input
            className="h-8 text-xs"
            value={String(paddingRight).replace("px", "")}
            onChange={(e) => handlePaddingChange(e.target.value, "Right")}
            placeholder="0"
          />
        </div>
        <div>
          <Label className="text-[10px]">Bottom</Label>
          <Input
            className="h-8 text-xs"
            value={String(paddingBottom).replace("px", "")}
            onChange={(e) => handlePaddingChange(e.target.value, "Bottom")}
            placeholder="0"
          />
        </div>
        <div>
          <Label className="text-[10px]">Left</Label>
          <Input
            className="h-8 text-xs"
            value={String(paddingLeft).replace("px", "")}
            onChange={(e) => handlePaddingChange(e.target.value, "Left")}
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );
};

export default FramePaddingControls;
