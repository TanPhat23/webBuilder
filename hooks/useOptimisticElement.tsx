import { EditorElement } from "@/lib/type";
import { useEditorStore } from "@/lib/store/editorStore";

/**
 * Legacy hook that now uses only the Zustand store
 * This provides backward compatibility for components that still use the old API
 */
export function useOptimisticElement() {
  const {
    elements,
    updateElementOptimistically,
    addElementOptimistically,
    deleteElementOptimistically,
  } = useEditorStore();

  // This is a compatibility adapter for the old API that required dispatch
  const addElementOptimisticallyAdapter = async (
    element: EditorElement,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dispatch: any,
    projectId: string
  ) => {
    await addElementOptimistically(element, projectId);
  };

  return {
    // Return elements as optimisticElements for backward compatibility
    optimisticElements: elements,
    updateElementOptimistically,
    deleteElementOptimistically,
    addElementOptimistically: addElementOptimisticallyAdapter,
  };
}
