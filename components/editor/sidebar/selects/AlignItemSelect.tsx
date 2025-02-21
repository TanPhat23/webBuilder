import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEditorContext } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import React from "react";

type Props = {
  selectedElement: EditorElement | undefined;
};

const AlignItemSelect = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const currentItem = selectedElement?.styles?.alignItems || "center";
  const handleItemChange = (value: string) => {
    if (!selectedElement) return;

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            alignItems: value,
          },
        },
      },
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
