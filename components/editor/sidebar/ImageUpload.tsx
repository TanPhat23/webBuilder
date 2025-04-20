"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useImageStore } from "@/lib/store/imageStore";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { UploadedFileData } from "uploadthing/types";
import { deleteImage } from "@/app/api/uploadthing/route";

const ImageUpload: React.FC = () => {
  const { uploadImages, addImage, removeImage } = useImageStore();

  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    e.dataTransfer.setData("image", index.toString());
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div className="flex flex-col">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          res.forEach((file) => {
            addImage(file as UploadedFileData);
          });
        }}
        onUploadError={(error: Error) => {
          console.error("Upload error:", error);
        }}
        content={{
          allowedContent: "Images up to 4MB",
        }}
      />

      <div className="grid grid-cols-3 gap-2 mt-4 max-h-[400px] overflow-y-auto">
        {uploadImages.map((image, index) => (
          <div key={index} className="relative">
            <Button
              variant="destructive"
              className="absolute top-2 right-2 z-10 w-5 h-5 flex items-center justify-center p-0 min-w-0 min-h-0"
              onClick={() => {
                try {
                  removeImage(image.ufsUrl);
                  deleteImage(image);
                  setImageErrors((prev) => ({ ...prev, [index]: false }));
                } catch (error) {
                  console.error("Error removing image:", error);
                }
              }}
            >
              x
            </Button>

            {!imageErrors[index] ? (
              <Image
                src={image.ufsUrl}
                height={80}
                width={80}
                alt={`Uploaded ${index + 1}`}
                className="h-20 w-full object-cover rounded-md cursor-move border hover:border-blue-500"
                draggable
                onDragStart={(e) => handleImageDragStart(e, index)}
                onError={() => handleImageError(index)}
                unoptimized
              />
            ) : (
              <div className="h-20 w-full flex items-center justify-center bg-gray-200 rounded-md border text-xs text-gray-500">
                Failed to load image
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
