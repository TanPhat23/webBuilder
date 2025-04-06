import { create } from "zustand";
import { EditorElement } from "../type";

interface ElementSelectionState {
  selectedElement: EditorElement | undefined;
  setSelectedElement: (element: EditorElement | undefined) => void;
  startTour: boolean;
  setStartTour: (value: boolean) => void;
  toggleTour: () => void;
  saveTourState: () => void;
  loadTourState: () => void;
}

export const useElementSelectionStore = create<ElementSelectionState>(
  (set, get) => ({
    selectedElement: undefined,
    startTour: false,

    setSelectedElement: (element) => {
      set({ selectedElement: element });
    },

    setStartTour: (value) => {
      set({ startTour: value });
      if (value === false) {
        get().saveTourState();
      }
    },

    toggleTour: () => {
      set((state) => ({ startTour: !state.startTour }));
    },

    saveTourState: () => {
      if (typeof window !== "undefined") {
        localStorage.setItem("watchTour", "true");
      }
    },

    loadTourState: () => {
      if (typeof window !== "undefined") {
        const watchTour = localStorage.getItem("watchTour");
        if (!watchTour) {
          set({ startTour: true });
          localStorage.setItem("watchTour", "true");
        }
      }
    },
  })
);
