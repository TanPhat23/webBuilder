import { create } from "zustand";

interface ImageUploadState {
  uploadImages: string[];
  setUploadImages: (images: string[]) => void;
  addImage: (image: string) => void;
  removeImage: (image: string) => void;
  loadImagesFromLocalStorage: () => void;
  saveImagesToLocalStorage: () => void;
}

export const useImageStore = create<ImageUploadState>((set, get) => ({
  uploadImages: [],

  setUploadImages: (images) => {
    set({ uploadImages: images });
  },

  addImage: (image) => {
    set((state) => ({
      uploadImages: [...state.uploadImages, image],
    }));
    get().saveImagesToLocalStorage();
  },

  removeImage: (imageToRemove) => {
    set((state) => ({
      uploadImages: state.uploadImages.filter(
        (image) => image !== imageToRemove
      ),
    }));
    get().saveImagesToLocalStorage();
  },

  loadImagesFromLocalStorage: () => {
    if (typeof window !== "undefined") {
      const localImages = localStorage.getItem("uploadImages");
      if (localImages) {
        try {
          const images = JSON.parse(localImages);
          set({ uploadImages: images });
        } catch (error) {
          console.error("Failed to parse images from localStorage:", error);
        }
      }
    }
  },

  saveImagesToLocalStorage: () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("uploadImages", JSON.stringify(get().uploadImages));
    }
  },
}));
