import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageStore } from "@/lib/store/imageStore";
import { useEditorStore } from "@/lib/store/editorStore";

const ImageUpload: React.FC = () => {
  const { uploadImages, setUploadImages, addImage } = useImageStore();
  const { updateElement } = useEditorStore();

  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files);
    }
  };

  const handleImageUpload = async (files: FileList) => {
    setUploading(true);

    try {
      const fileArray = Array.from(files);

      for (let i = 0; i < fileArray.length; i++) {
        const file = fileArray[i];
        const reader = new FileReader();

        reader.onloadend = () => {
          if (reader.result) {
            const imageDataURL = reader.result.toString();
            addImage(imageDataURL);
          }
        };

        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageUpload(e.target.files);
    }
  };

  const handleImageDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    e.dataTransfer.setData("image", index.toString());
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <h2 className="text-lg font-semibold">Image Upload</h2>

      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors",
          {
            "border-blue-500 bg-blue-50": dragOver,
            "border-gray-300 hover:border-blue-300": !dragOver,
          }
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileInputChange}
        />

        <p className="text-sm text-gray-500">
          {uploading
            ? "Uploading..."
            : "Drag & drop images here or click to browse"}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4 max-h-[400px] overflow-y-auto">
        {uploadImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Uploaded ${index + 1}`}
            className="h-20 w-full object-cover rounded-md cursor-move border hover:border-blue-500"
            draggable
            onDragStart={(e) => handleImageDragStart(e, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
