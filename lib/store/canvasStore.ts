import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CanvasStyles } from "../interface";
import { UpdateProject } from "@/app/actions/project/action";

interface CanvasState {
  styles: CanvasStyles;
  canvasFontFamilies: string[];
  setFontFamilies: (fontFamilies: string[]) => void;
  setStyles: (id: string, styles: CanvasStyles) => void;
  loadCanvasStylesFromDB: (styles: CanvasStyles) => void;
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
      canvasFontFamilies: [],
      styles: defaultStyles,
      setStyles: (id: string, styles: CanvasStyles) => {
        const prevStyles = useCanvasStore.getState().styles;
        try {
          set({ styles });
          UpdateProject({ id: id, styles: styles });
        } catch (error) {
          set({ styles: prevStyles });
          console.error("Error setting styles:", error);
        }
      },

      setFontFamilies: (fontFamilies: string[]) => {
        set({ canvasFontFamilies: fontFamilies });
      },

      loadCanvasStylesFromDB: (styles: CanvasStyles) => {
        set({ styles });
      },
    }),
    {
      name: "canvas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
