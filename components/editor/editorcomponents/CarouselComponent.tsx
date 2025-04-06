import { CarouselElement, EditorElement } from "@/lib/type";
import React, { startTransition, useCallback } from "react";
import Slider, { Settings } from "react-slick";
import FrameComponents from "./FrameComponents";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import createElements from "@/app/utils/CreateFrameElements";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { useImageStore } from "@/lib/store/imageStore";

type Props = {
  element: CarouselElement;
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
  const { uploadImages } = useImageStore();
  const { updateElement, updateElementOptimistically } = useEditorStore();
  const { setSelectedElement } = useElementSelectionStore();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    let elementType = e.dataTransfer.getData("elementType");
    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];
    if (imgSrc) elementType = "Image";
    createElements(
      elementType,
      null,
      element,
      projectId,
      updateElement,
      imgSrc
    );
  };

  const handleImageDrop = (
    e: React.DragEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // Check for regular image drop from the sidebar
    const imgIdx = e.dataTransfer.getData("image");
    let imgSrc = null;

    if (imgIdx) {
      // Handle image from image library
      imgSrc = uploadImages[parseInt(imgIdx)];
    } else if (e.dataTransfer.types.includes("text/plain")) {
      // Handle data URL dropped directly
      const data = e.dataTransfer.getData("text/plain");
      if (data.startsWith("data:image")) {
        imgSrc = data;
      }
    }

    if (imgSrc) {
    
      startTransition(() => {
        updateElementOptimistically(element.id, {
          src: imgSrc,
        });
      });
    }
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!element.isSelected) setSelectedElement(element);
    updateElement(element.id, {
      isSelected: !element.isSelected,
    });
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
            // onDrop={(e) => handleImageDrop(e, element)}
            onDragOver={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onDoubleClick={(e) => handleDoubleClick(e, element)}
            className={cn("slick-slide", element.tailwindStyles, {
              "border-black border-2 border-solid": element.isSelected,
            })}
          />
        );
      default:
        return (
          <motion.div
            onDoubleClick={(e) => handleDoubleClick(e, element)}
            key={element.id}
            style={{ ...element.styles }}
            className={element.tailwindStyles}
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content || ""),
            }}
            onDrag={(e) => e.stopPropagation()}
          />
        );
    }
  };

  const [carouselSettings, setCarouselSettings] = React.useState<Settings>(
    () => {
      const defaults = {
        dots: true,
        infinite: true,
        arrows: true,
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
      };
      return {
        ...defaults,
        ...element.settings,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(element.settings?.slidesToShow || 3, 2),
              slidesToScroll: Math.min(
                element.settings?.slidesToScroll || 1,
                1
              ),
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      };
    }
  );

  React.useEffect(() => {
    const newSettings = {
      ...carouselSettings,
      ...element.settings,
    };
    if (!newSettings.responsive) {
      newSettings.responsive = carouselSettings.responsive;
    }
    setCarouselSettings(newSettings);
  }, [element.settings]);

  return (
    <div
      id={element.id}
      onDrop={handleDrop}
      className={cn("slider-container ", "mx-auto max-w-[95vw]")}
      onDragOver={(e) => e.preventDefault()}
      style={{ minHeight: "200px" }}
    >
      <Slider
        key={`slider-${element.id}-${JSON.stringify(carouselSettings)}`}
        {...carouselSettings}
      >
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
