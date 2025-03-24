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

const JustifyContentSelect = ({ selectedElement }: Props) => {
  const currentJustifyContent =
    selectedElement?.styles?.justifyContent || "center";

  const { updateElementOptimistically } =
    useOptimisticElement();

  const handleJustifyContentChange = (value: string) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          justifyContent: value,
        },
      });
    });
  };
  return (
    <Select
      value={currentJustifyContent}
      onValueChange={handleJustifyContentChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select justify content" />
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

export default JustifyContentSelect;
