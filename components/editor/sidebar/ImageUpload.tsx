"use client";
import React, { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { useImageStore } from "@/lib/store/imageStore";
import { UploadDropzone } from "@/utils/uploadthing";
import Image from "next/image";
import { UploadedFileData } from "uploadthing/types";
import { deleteImage } from "@/app/api/uploadthing/route";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { blobToBase64 } from "@/app/utils/HandleImage";
import { Scissors, X } from "lucide-react";
import { CreateImages, DeleteImage } from "@/app/actions/images";

// Types from react-easy-crop
interface Point {
  x: number;
  y: number;
}

interface Area {
  width: number;
  height: number;
  x: number;
  y: number;
}

// Modified to handle CORS issues
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous"; // Add crossOrigin attribute
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error: Event) => reject(error));
    image.src = url;
  });

// This function gets a blob from the cropped area instead of using canvas.toDataURL
// to avoid "Tainted canvas" errors with cross-origin images
async function getCroppedImgAsBlob(
  imageSrc: string,
  pixelCrop: Area
): Promise<Blob> {
  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Set canvas dimensions to the cropped size
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // Draw the cropped image
    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    // Return as blob instead of data URL
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        },
        "image/jpeg",
        0.95 // Quality
      );
    });
  } catch (error) {
    console.error("Error creating cropped image:", error);
    throw error;
  }
}

const ImageUpload: React.FC = () => {
  const { uploadImages, addImage, removeImage } = useImageStore();
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Crop state
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState<string | null>(null);
  const [originalImageIndex, setOriginalImageIndex] = useState<number | null>(
    null
  );
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isCropping, setIsCropping] = useState(false);

  const handleCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const handleCropImage = useCallback(async () => {
    if (!imageToCrop || !croppedAreaPixels) return;

    try {
      setIsCropping(true);
      // Get the cropped image as a blob
      const croppedImageBlob = await getCroppedImgAsBlob(
        imageToCrop,
        croppedAreaPixels
      );

      // Convert blob to base64
      const croppedImageBase64 = await blobToBase64(croppedImageBlob);

      // If we're cropping an existing image
      if (originalImageIndex !== null && originalImageIndex >= 0) {
        // Remove the old image
        const oldImage = uploadImages[originalImageIndex];
        removeImage(oldImage.ufsUrl);

        // Create a new object that mimics the UploadedFileData structure
        const croppedImageData: UploadedFileData = {
          ...oldImage,
          ufsUrl: croppedImageBase64,
        };

        // Add the cropped image
        addImage(croppedImageData);
      }

      // Close the dialog
      setCropDialogOpen(false);
      setImageToCrop(null);
      setOriginalImageIndex(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    } catch (error) {
      console.error("Error cropping image:", error);
    } finally {
      setIsCropping(false);
    }
  }, [
    imageToCrop,
    croppedAreaPixels,
    originalImageIndex,
    uploadImages,
    removeImage,
    addImage,
  ]);

  const handleImageDragStart = (
    e: React.DragEvent<HTMLImageElement>,
    index: number
  ) => {
    e.dataTransfer.setData("image", index.toString());
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const openCropDialog = (imageUrl: string, index: number) => {
    setImageToCrop(imageUrl);
    setOriginalImageIndex(index);
    setCropDialogOpen(true);
  };

  return (
    <div className="flex flex-col">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={async (res) => {
          try {
            res.forEach((file) => {
              addImage(file as UploadedFileData);
            });
            await CreateImages(res);
          } catch (error) {
            res.forEach((file) => {
              deleteImage(file);
              removeImage(file.ufsUrl);
            });
            console.error("Error creating images:", error);
          }
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
          <div key={index} className="relative group">
            <div className="absolute top-2 right-2 z-10 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                className="w-6 h-6 flex items-center justify-center p-0 min-w-0 min-h-0"
                onClick={() => openCropDialog(image.ufsUrl, index)}
                title="Crop image"
              >
                <Scissors className="h-3 w-3" />
              </Button>
              <Button
                variant="destructive"
                className="w-6 h-6 flex items-center justify-center p-0 min-w-0 min-h-0"
                onClick={() => {
                  try {
                    removeImage(image.ufsUrl);
                    deleteImage(image);
                    DeleteImage(image.ufsUrl);
                    setImageErrors((prev) => ({ ...prev, [index]: false }));
                  } catch (error) {
                    console.error("Error removing image:", error);
                  }
                }}
                title="Remove image"
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

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
                crossOrigin="anonymous"
              />
            ) : (
              <div className="h-20 w-full flex items-center justify-center bg-gray-200 rounded-md border text-xs text-gray-500">
                Failed to load image
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>

          <div className="relative h-[300px] w-full mt-4">
            {imageToCrop && (
              <Cropper
                image={imageToCrop}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                onZoomChange={setZoom}
              />
            )}
          </div>

          <div className="mt-4">
            <p className="text-sm mb-2">Zoom</p>
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="w-full"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button
              variant="outline"
              onClick={() => setCropDialogOpen(false)}
              disabled={isCropping}
            >
              Cancel
            </Button>
            <Button onClick={handleCropImage} disabled={isCropping}>
              {isCropping ? "Processing..." : "Apply Crop"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageUpload;
