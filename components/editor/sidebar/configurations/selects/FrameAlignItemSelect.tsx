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


const AlignItemSelect = ({ selectedElement }: Props) => {

  const {  updateElementOptimistically } =
    useOptimisticElement();
  const currentItem = selectedElement?.styles?.alignItems || "center";
  const handleItemChange = (value: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          alignItems: value,
        },
      });
    });
  };
  return (
    <Select value={currentItem} onValueChange={handleItemChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select item alignment" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="start">Start</SelectItem>
        <SelectItem value="center">Center</SelectItem>
        <SelectItem value="end">End</SelectItem>
        <SelectItem value="stretch">Stretch</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AlignItemSelect;
