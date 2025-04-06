import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ImageUploadState {
  uploadImages: string[];

  addImage: (image: string) => void;
  removeImage: (image: string) => void;
}

export const useImageStore = create<ImageUploadState>()(
  persist(
    (set) => ({
      uploadImages: [],


      addImage: (image) => {
        set((state) => ({
          uploadImages: [...state.uploadImages, image],
        }));
      },

      removeImage: (imageToRemove) => {
        set((state) => ({
          uploadImages: state.uploadImages.filter(
            (image) => image !== imageToRemove
          ),
        }));
      },
    }),
    {
      name: "uploadImages",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state && !Array.isArray(state.uploadImages)) {
          state.uploadImages = [];
        }
      },
    }
  )
);
