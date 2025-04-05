import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { Property } from "csstype";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FrameFlexWrapSelect = ({ selectedElement }: Props) => {
  const currentFlexWrap = selectedElement?.styles?.flexWrap || "nowrap";
  const { updateElementOptimistically } = useOptimisticElement();

  const handleFlexWrapChange = (value: Property.FlexWrap) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          flexWrap: value,
        },
      });
    });
  };

  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs text-muted-foreground">Flex Wrap</label>
      <Select value={currentFlexWrap} onValueChange={handleFlexWrapChange}>
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Flex Wrap" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="nowrap">No Wrap</SelectItem>
          <SelectItem value="wrap">Wrap</SelectItem>
          <SelectItem value="wrap-reverse">Wrap Reverse</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FrameFlexWrapSelect;
