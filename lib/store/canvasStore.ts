import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CanvasStyles } from "../interface";
import { UpdateProject } from "@/actions/project/action";

interface CanvasState {
  styles: CanvasStyles;
  fontfamilies: string[];
  setFontFamilies: (fontfamilies: string[]) => void;
  setStyles: (id: string, styles: CanvasStyles) => void;
  loadCansvasStylesFromDB: (styles: CanvasStyles) => void;
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
      fontfamilies: [],
      styles: defaultStyles,
      setStyles: (id: string, styles: CanvasStyles) => {
        const prevstyles = useCanvasStore.getState().styles;
        try {
          set({ styles });
          UpdateProject({ id: id, styles: styles });
        } catch (error) {
          set({ styles: prevstyles });
          console.error("Error setting styles:", error);
        }
      },
      
      setFontFamilies: (fontfamilies: string[]) => {
        set({ fontfamilies });
      },

      loadCansvasStylesFromDB: (styles: CanvasStyles) => {
        set({ styles });
      },
    }),
    {
      name: "canvas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
