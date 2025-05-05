import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CanvasStyles } from "../interface";


interface CanvasState {
  styles: CanvasStyles;
  setStyles: (styles: CanvasStyles) => void;
}

const defaultStyles: CanvasStyles = {
  backgroundColor: "#ffffff",
  width: "100%",
  height: "100%",
  gridEnabled: false,
  gridSize: 8,
  snapToGrid: false,
  overflow: "auto",
  gridColor: "#dddddd",
};

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set) => ({
      styles: defaultStyles,
      setStyles: (styles: CanvasStyles) => {
        set({ styles });
      },
    }),
    {
      name: "canvas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
