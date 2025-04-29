import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CanvasStyles {
  backgroundColor?: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  gridEnabled?: boolean;
  gridSize?: number;
  snapToGrid?: boolean;
  gridColor?: string;
  overflow?: string;
  borderRadius?: string;
  border?: string;
  boxShadow?: string;
  backdropFilter?: string;
  transition?: string;
  [key: string]: unknown;
}

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
