import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FrameBorderRadiusControl = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useOptimisticElement();

  const borderRadius = String(selectedElement?.styles?.borderRadius || "0px");

  const handleBorderRadiusChange = (value: string) => {
    if (!selectedElement) return;

    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          borderRadius: value,
        },
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-xs text-muted-foreground">Border Radius</Label>
      <Select value={borderRadius} onValueChange={handleBorderRadiusChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Border Radius" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="0px">None</SelectItem>
          <SelectItem value="4px">Small (4px)</SelectItem>
          <SelectItem value="8px">Medium (8px)</SelectItem>
          <SelectItem value="12px">Large (12px)</SelectItem>
          <SelectItem value="16px">XL (16px)</SelectItem>
          <SelectItem value="24px">2XL (24px)</SelectItem>
          <SelectItem value="9999px">Full</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrameBorderRadiusControl;
