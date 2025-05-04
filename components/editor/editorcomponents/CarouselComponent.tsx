"use client";

import React, { useOptimistic, useMemo, startTransition } from "react";
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
  const [settings, setSettings] = React.useState<Settings>(
    (element as CarouselElement).carouselSettings || {}
  );
  React.useEffect(() => {
    setSettings((element as CarouselElement).carouselSettings || {});
  }, [element.carouselSettings]);

  const [optimisticElements] = useOptimistic(
    element.elements,
    (newElements: EditorElement[]) => newElements
  );

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
      imgSrc.ufsUrl
    );
  };

  const handleSwap = (fromIndex: number, toIndex: number) => {
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
        element.isSelected && "ring-2 ring-black"
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
            className={cn(commonProps.className, "object-cover")}
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
      className="h-full carousel-container px-10"
      onDragOver={(e) => e.preventDefault()}
      style={{
        backgroundColor: element.styles?.backgroundColor,
        backgroundImage: element.styles?.backgroundImage,
        backgroundSize: element.styles?.backgroundSize,
        backgroundPosition: element.styles?.backgroundPosition,
        backgroundRepeat: element.styles?.backgroundRepeat,
      }}
    >
      <Slider key={`slider-${element.id}`} {...settings}>
        {optimisticElements.map((childElement, index) => (
          <div key={childElement.id} className="h-full relative px-2 pb-8">
            <div
              className="flex items-center justify-center overflow-hidden"
              style={{ height: element.styles?.height }}
            >
              {renderElement(childElement, index)}
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwap(index, index - 1)}
                disabled={index === 0}
                className="gap-1 hover:bg-gray-100"
              >
                <ArrowLeftCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Move Left</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSwap(index, index + 1)}
                disabled={index === optimisticElements.length - 1}
                className="gap-1 hover:bg-gray-100"
              >
                <span className="hidden sm:inline">Move Right</span>
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
