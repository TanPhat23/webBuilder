import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FrameGapSelect = ({ selectedElement }: Props) => {
  const currentGap = selectedElement?.styles?.gap?.toString() || "0px";
  const { updateElementOptimistically } = useOptimisticElement();

  const handleGapChange = (value: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          gap: value,
        },
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-muted-foreground">Gap</label>
      <Select value={currentGap} onValueChange={handleGapChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Gap" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0px">None</SelectItem>
          <SelectItem value="4px">4px</SelectItem>
          <SelectItem value="8px">8px</SelectItem>
          <SelectItem value="12px">12px</SelectItem>
          <SelectItem value="16px">16px</SelectItem>
          <SelectItem value="24px">24px</SelectItem>
          <SelectItem value="32px">32px</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrameGapSelect;
