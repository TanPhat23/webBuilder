import { useOptimistic } from "react";
import { EditorElement } from "@/lib/type";
import { Update } from "@/app/api/element/route";
import { useEditorContext } from "@/lib/context";

export function useOptimisticElement() {
  const { elements, dispatch } = useEditorContext();

  const [optimisticElements, addOptimisticUpdate] = useOptimistic(
    elements,
    (state, update: { id: string; updates: Partial<EditorElement> }) => {
      return state.map((element) =>
        element.id === update.id ? { ...element, ...update.updates } : element
      );
    }
  );

  const updateElementOptimistically = async (
    id: string,
    updates: Partial<EditorElement>
  ) => {
    addOptimisticUpdate({ id, updates });

    const updatedElement = optimisticElements.find((e) => e.id === id);
    if (!updatedElement) return;

    console.log("Updated Element:", updatedElement);

    try {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { id, updates },
      });

      const latestElement = { ...updatedElement, ...updates };
      await Update(latestElement);
    } catch (error) {
      console.error("Failed to update element:", error);
    }
  };

  return {
    optimisticElements,
    updateElementOptimistically,
  };
}
