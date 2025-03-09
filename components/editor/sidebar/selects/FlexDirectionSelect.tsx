import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EditorElement } from "@/lib/type";
import React, { startTransition } from "react";
import { useEditorContext } from "@/lib/context";
import { Property } from "csstype";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

type Props = {
  selectedElement: EditorElement | undefined;
};

const FlexDirectionSelect = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();

  const currentFlexDirection = selectedElement?.styles?.flexDirection || "row";

  const { optimisticElements, updateElementOptimistically } =
      useOptimisticElement();
  

  const handleFlexDirectionChange = (value: Property.FlexDirection) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          flexDirection: value,
        },
      });
    });
  };

  return (
    <Select
      value={currentFlexDirection}
      onValueChange={handleFlexDirectionChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select flex direction" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="row">Row</SelectItem>
        <SelectItem value="row-reverse">Row Reverse</SelectItem>
        <SelectItem value="column">Column</SelectItem>
        <SelectItem value="column-reverse">Column Reverse</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default FlexDirectionSelect;
