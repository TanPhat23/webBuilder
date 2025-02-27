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

const JustifyContentSelect = ({ selectedElement }: Props) => {
  const { dispatch } = useEditorContext();
  const currentJustifyContent =
    selectedElement?.styles?.justifyContent || "center";
  const handleJustifyContentChange = (value: string) => {
    if (!selectedElement) return;

    dispatch({
      type: "UPDATE_ELEMENT",
      payload: {
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            justifyContent: value,
          },
        },
      },
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
