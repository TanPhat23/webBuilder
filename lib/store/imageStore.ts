import { UploadedFileData } from "uploadthing/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ImageUploadState {
  uploadImages: UploadedFileData[];

  addImage: (image: UploadedFileData) => void;
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
            (image) => image.ufsUrl !== imageToRemove
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
