import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface canvasState {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export const useCanvasStore = create<canvasState>()(
  persist(
    (set) => ({
      backgroundColor: "#f3f4f6", 

      setBackgroundColor: (color: string) => {
        set({ backgroundColor: color });
      },
    }),
    {
      name: "canvas-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
