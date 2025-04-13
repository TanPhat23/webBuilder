import { useEditorStore } from "@/lib/store/editorStore";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import { startTransition } from "react";

interface TailwindUpdate {
  (className: string, element: EditorElement): void;
}

export default function useTailwindUpdate() : TailwindUpdate {
  const { updateElementOptimistically } = useEditorStore();

  const updateTailwind = (className: string, element: EditorElement) => {
    const { id } = element;

    const newElement = {
      ...element,
      className: cn(element.tailwindStyles, className),
    };

    startTransition(() => {
      updateElementOptimistically(id, newElement);
    });
  };

  return updateTailwind;
}
