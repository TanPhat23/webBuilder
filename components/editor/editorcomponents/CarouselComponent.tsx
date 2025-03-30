import { CarouselElement, EditorElement } from "@/lib/type";
import React, { startTransition, useCallback } from "react";
import Slider from "react-slick";
import FrameComponents from "./FrameComponents";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEditorContext, useImageUploadContext } from "@/lib/context";
import createElements from "@/app/utils/CreateFrameElements";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

type Props = {
  element: CarouselElement; // More specific type
  setContextMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  projectId: string;
};

const CarouselComponent: React.FC<Props> = ({
  element,
  setContextMenuPosition,
  setShowContextMenu,
  projectId,
}) => {
  const { uploadImages } = useImageUploadContext();
  const { updateElementOptimistically } = useOptimisticElement();
  const { dispatch } = useEditorContext();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let elementType = e.dataTransfer.getData("elementType");
    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];
    if (imgSrc) elementType = "Image";
    createElements(elementType, dispatch, element, projectId, imgSrc);
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => {
    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];
    console.log(imgSrc);

    if (imgSrc) {
      startTransition(() => {
        updateElementOptimistically(element.id, {
          ...element,
          src: imgSrc,
        });
      });
    }
  };
  const renderElement = (element: EditorElement, index: number) => {
    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );
      case "Image":
        return (
          <motion.img
            key={element.id}
            src={element.src}
            alt={`Carousel Image ${index}`}
            style={{
              ...element.styles,
            }}
            onDrop={(e) => handleImageDrop(e, element)}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="w-full h-full object-contain max-w-full max-h-full slick-slide"
          />
        );
      default:
        return (
          <motion.div
            key={element.id}
            style={{ ...element.styles }}
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content || ""),
            }}
          />
        );
    }
  };
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    variableWidth: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2, slidesToScroll: 1 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  return (
    <div
      id={element.id}
      onDrop={handleDrop}
      className="slider-container mx-auto max-w-[95vw]"
      onDragOver={(e) => e.preventDefault()}
      style={{ minHeight: "200px" }}
    >
      <Slider {...carouselSettings}>
        {element.elements?.map((childElement, index) => (
          <div key={childElement.id} className="h-full px-2">
            <div className="relative h-full w-full flex items-center justify-center aspect-[4/1] rounded-lg overflow-hidden">
              {renderElement(childElement, index)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
