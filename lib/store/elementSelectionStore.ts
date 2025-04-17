import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { EditorElement } from "../type";

interface ElementSelectionState {
  selectedElementId: string | undefined;
  selectedElement: EditorElement | undefined;
  multiSelectedElementIds: string[];
  startTour: boolean;
  setStartTour: (value: boolean) => void;
  setSelectedElement: (element: EditorElement | undefined) => void;
  setSelectedElementId: (id: string | undefined) => void;
  addMultiSelectedElement: (id: string) => void;
  removeMultiSelectedElement: (id: string) => void;
  clearMultiSelection: () => void;
}

export const useElementSelectionStore = create<ElementSelectionState>()(
  persist(
    (set) => ({
      selectedElementId: undefined,
      selectedElement: undefined,
      multiSelectedElementIds: [],
      startTour: false,

      setStartTour: (value) => {
        set({ startTour: value });
      },

      setSelectedElement: (element) => {
        set({ selectedElement: element });
      },

      setSelectedElementId: (id) => {
        set({ selectedElementId: id });
      },

      addMultiSelectedElement: (id) => {
        set((state) => ({
          multiSelectedElementIds: [...state.multiSelectedElementIds, id],
        }));
      },

      removeMultiSelectedElement: (id) => {
        set((state) => ({
          multiSelectedElementIds: state.multiSelectedElementIds.filter(
            (elementId) => elementId !== id
          ),
        }));
      },

      clearMultiSelection: () => {
        set({ multiSelectedElementIds: [] });
      },
    }),
    {
      name: "selection-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
