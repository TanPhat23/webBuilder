"use client";

import { useOptimistic, useMemo, startTransition } from "react";
import Slider, { Settings } from "react-slick";
import FrameComponents from "./FrameComponents";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import createElements from "@/utils/createFrameElements";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { useImageStore } from "@/lib/store/imageStore";
import { Button } from "@/components/ui/button";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";
import ButtonComponent from "./ButtonComponent";
import { CarouselElement, EditorComponentProps } from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./ListItemComponent";

type Props = EditorComponentProps & {
  element: CarouselElement;
};

const CarouselComponent: React.FC<Props> = ({
  element,
  setContextMenuPosition,
  setShowContextMenu,
  projectId,
}) => {
  const { uploadImages } = useImageStore();
  const { updateElement } = useEditorStore();
  const { setSelectedElement } = useElementSelectionStore();

  const [optimisticElements] = useOptimistic(
    element.elements,
    (state, newElements: EditorElement[]) => newElements
  );

  const carouselSettings = useMemo<Settings>(() => {
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
            slidesToShow: 2,
            slidesToScroll: 1,
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
  }, [element.settings]);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const elementType = e.dataTransfer.getData("elementType");
    const imgIdx = e.dataTransfer.getData("image");
    const imgSrc = uploadImages[parseInt(imgIdx)];

    createElements(
      imgSrc ? "Image" : elementType,
      element,
      projectId,
      updateElement,
      imgSrc
    );
  };

  const handleSwap = async (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= optimisticElements.length) return;

    const newElements = [...optimisticElements];
    [newElements[fromIndex], newElements[toIndex]] = [
      newElements[toIndex],
      newElements[fromIndex],
    ];

    startTransition(() => {
      updateElement(element.id, { elements: newElements });
    });
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();

    const newSelectionState = !element.isSelected;
    if (newSelectionState) {
      setSelectedElement(element);
    }
    updateElement(element.id, { isSelected: newSelectionState });
  };

  const renderElement = (
    element: EditorElement,
    index: number
  ): React.ReactNode => {
    const commonProps = {
      onDoubleClick: (e: React.MouseEvent<HTMLElement>) =>
        handleDoubleClick(e, element),
      className: cn(
        element.tailwindStyles,
        element.isSelected && "border-black border-2 border-solid"
      ),
      style: element.styles,
    };

    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            key={element.id}
            {...commonProps}
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
            {...commonProps}
            src={element.src}
            alt={`Carousel Image ${index}`}
            className={cn(commonProps.className, "slick-slide")}
            loading="lazy"
          />
        );
      case "ListItem":
        return (
          <ListItemComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            {...commonProps}
          />
        );
      default:
        return (
          <motion.div
            {...commonProps}
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content || ""),
            }}
          />
        );
    }
  };

  return (
    <div
      id={element.id}
      onDrop={handleDrop}
      className="slider-container h-full mx-10"
      onDragOver={(e) => e.preventDefault()}
    >
      <Slider
        key={`slider-${element.id}-${JSON.stringify(carouselSettings)}`}
        {...carouselSettings}
      >
        {optimisticElements.map((childElement, index) => (
          <div key={childElement.id} className="h-full group relative">
            <div className="relative h-full w-full flex items-center justify-center aspect-[4/1] rounded-lg overflow-hidden">
              {renderElement(childElement, index)}
            </div>

            <div className="flex gap-2 justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute bottom-0 left-0 right-0 z-10 bg-white/30 py-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSwap(index, index - 1)}
                disabled={index === 0}
                className="gap-1 "
              >
                <ArrowLeftCircle className="h-4 w-4" />
                <span>Move Left</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleSwap(index, index + 1)}
                disabled={index === optimisticElements.length - 1}
                className="gap-1 "
              >
                <span>Move Right</span>
                <ArrowRightCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
