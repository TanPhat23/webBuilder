import { useEditorContext, useImageUploadContext } from "@/lib/context";
import React, { useCallback } from "react";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { EditorElement } from "@/lib/type";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "next/navigation";
import { Create } from "@/app/api/element/route";

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

  const handleClick = (e: React.MouseEvent, index: number) => {
    const img = new Image();
    img.src = uploadImages[index];
    img.onload = () => {
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      const fixedWidth = 200;
      const calculatedHeight = fixedWidth / aspectRatio;
      const newElement: EditorElement = {
        type: "Image",
        id: `Image-${uuidv4()}`,
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

      try {
        Create(newElement);
        dispatch({ type: "ADD_ELEMENT", payload: newElement });
      } catch (e) {
        console.log(e);
        dispatch({ type: "DELETE_ELEMENT", payload: newElement.id });
      }
    };
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  };

  React.useEffect(() => {
    localStorage.setItem("uploadImages", JSON.stringify(uploadImages));
  }, [handleChange]);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.setData("image", `${index}`);
  };
  return (
    <div>
      <Input
        type="file"
        accept="image/*"
        onChange={(e) => {
          handleChange(e);
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
              onDragStart={(e) => handleDragStart(e, index)}
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
