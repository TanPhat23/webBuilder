import { useCallback } from "react";
import { useEditorStore } from "@/lib/store/editorStore";
import { EditorElement } from "@/lib/type";
import { startTransition } from "react";

/**
 * A hook that provides optimistic update actions for the editor
 * This is a cleaner API to use for new components instead of directly
 * accessing the store or using the legacy useOptimisticElement hook
 */
export function useEditorOptimisticActions() {
  const {
    elements,
    updateElementOptimistically,
    deleteElementOptimistically,
    addElementOptimistically,
    isLoading,
    error,
  } = useEditorStore();

  // Convenience wrapper that uses startTransition
  const updateElement = useCallback(
    (id: string, updates: Partial<EditorElement>) => {
      startTransition(() => {
        updateElementOptimistically(id, updates);
      });
    },
    [updateElementOptimistically]
  );

  // Convenience wrapper that uses startTransition
  const deleteElement = useCallback(
    (id: string) => {
      startTransition(() => {
        deleteElementOptimistically(id);
      });
    },
    [deleteElementOptimistically]
  );

  // Convenience wrapper that uses startTransition
  const addElement = useCallback(
    (element: EditorElement, projectId: string) => {
      startTransition(() => {
        addElementOptimistically(element, projectId);
      });
    },
    [addElementOptimistically]
  );

  return {
    elements,
    updateElement,
    deleteElement,
    addElement,
    isLoading,
    error,
  };
}
