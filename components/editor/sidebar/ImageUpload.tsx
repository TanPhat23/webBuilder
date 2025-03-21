import { useEditorContext, useImageUploadContext } from "@/lib/context";
import React, { useCallback } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { EditorElement, Element } from "@/lib/type";
import { v4 as uuidv4 } from "uuid";
import { useParams, useRouter } from "next/navigation";

type Props = {};

const ImageUpload = (props: Props) => {
  const { uploadImages, setUploadImages } = useImageUploadContext();
  const { dispatch } = useEditorContext();
  const params = useParams();
  const { slug } = params;
  const handleRemoveImage = (index: number) => {
    const newImages = uploadImages.filter((_, i) => i !== index);
    setUploadImages(newImages);
  };

  const handleClick = useCallback(
    (e: React.MouseEvent, index: number) => {
      const img = new Image();
      img.src = uploadImages[index];
      img.onload = () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        const fixedWidth = 200;
        const calculatedHeight = fixedWidth / aspectRatio;
        const newElement: EditorElement = {
          type: "Img",
          id: `Img-${uuidv4()}`,
          isSelected: false,
          content: "",
          x: 0,
          y: 0,
          styles: {
            width: `${fixedWidth}px`,
            height: `${calculatedHeight}px`,
          },
          src: uploadImages[index],
          projectId: slug as string,
        };
        dispatch({ type: "ADD_ELEMENT", payload: newElement });
      };
    },
    [uploadImages, dispatch]
  );
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("text/plain", `Image + ${index}`);
  };
  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            if (!file.type.startsWith("image/")) {
              alert("Please upload an image file");
              return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
              setUploadImages([...uploadImages, reader.result as string]);
            };
            reader.onerror = () => {
              alert("Error reading file");
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <div className="mr-4 mt-4 grid grid-cols-3 gap-4">
        {uploadImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              draggable
              onClick={(e) => handleClick(e, index)}
              src={image}
              alt="uploaded"
              className="h-auto w-auto object-cover hover:scale-110 hover:cursor-pointer mx-2"
            />
            <Button
              onClick={() => handleRemoveImage(index)}
              className="absolute right-0 top-0  bg-red-500 text-white h-[10px] w-[2px]"
              aria-label="Remove image"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
