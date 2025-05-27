"use client";

import React, { startTransition } from "react";
import Slider, { Settings } from "react-slick";
import FrameComponents from "./FrameComponents";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import createElements from "@/utils/createFrameElements";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import { useImageStore } from "@/lib/store/imageStore";

import {
  CarouselElement,
  EditorComponentProps,
  commonProps,
} from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import ListItemComponent from "./ListItemComponent";
import ButtonComponent from "./ButtonComponent";
import InputComponent from "./InputComponent";
import SelectComponent from "./SelectComponent";
import ChartComponent from "./ChartComponent";
import DataTableComponent from "./DataTableComponent";
import FormComponent from "./FormComponent";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";

type Props = EditorComponentProps & {
  element: CarouselElement;
  commonProps?: Partial<commonProps>;
};

const CarouselComponent: React.FC<Props> = ({
  element,
  setContextMenuPosition,
  setShowContextMenu,
  projectId,
  commonProps,
}) => {
  const { uploadImages } = useImageStore();
  const { updateElement } = useEditorStore();
  const [settings, setSettings] = React.useState<Settings>(
    (element as CarouselElement).carouselSettings || {}
  );

  const {
    handleDoubleClick,
    handleContextMenu,
    handleDrop: hookHandleDrop,
    handleImageDrop,
    getContentProps,
    getCommonProps,
    draggingElement,
  } = useEditorElementHandlers({
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
  });

  React.useEffect(() => {
    setSettings((element as CarouselElement).carouselSettings || {});
  }, [element]);
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
  // const handleSwap = (fromIndex: number, toIndex: number) => {
  //   if (!element.elements || toIndex < 0 || toIndex >= element.elements.length)
  //     return;

  //   const newElements = [...element.elements];
  //   [newElements[fromIndex], newElements[toIndex]] = [
  //     newElements[toIndex],
  //     newElements[fromIndex],
  //   ];

  //   startTransition(() => {
  //     updateElement(element.id, { elements: newElements });
  //   });
  // };

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
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );

      case "Form":
        return (
          <FormComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );

      case "Chart":
        return (
          <ChartComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );

      case "DataTable":
        return (
          <DataTableComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
          />
        );

      case "Button":
        return (
          <ButtonComponent
            key={element.id}
            element={element}
            commonProps={commonProps}
            draggingElement={draggingElement}
            projectId={projectId}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
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
            parentHandlers={{
              handleDrop: hookHandleDrop,
              handleDoubleClick,
              handleContextMenu,
              handleImageDrop,
              getContentProps,
              getCommonProps,
              draggingElement,
            }}
          />
        );

      case "Select":
        return (
          <SelectComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDoubleClick,
              handleContextMenu,
              getCommonProps,
              draggingElement,
            }}
          />
        );

      case "Input":
        return (
          <InputComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            commonProps={commonProps}
          />
        );

      case "Link":
        return (
          <motion.a
            key={element.id}
            {...commonProps}
            href={element.href || "#"}
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content || ""),
            }}
          />
        );

      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              {...commonProps}
              src={element.src}
              alt={`Carousel Image ${index}`}
              className={cn(commonProps.className, "object-cover")}
              loading="lazy"
              drag={element.isSelected}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              {...commonProps}
              drag={element.isSelected}
              contentEditable={element.isSelected}
              suppressContentEditableWarning={true}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(
                  element.content || "Drop an image here"
                ),
              }}
            />
          );
        }

      default:
        return (
          <motion.div
            key={element.id}
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
    <motion.div
      id={element.id}
      onDrop={handleDrop}
      className={cn(
        "h-full carousel-container px-10 ",
        element.tailwindStyles,
        {
          "border-2  border-black": element.isSelected,
        }
      )}
      {...commonProps}
      style={{
        backgroundColor: element.styles?.backgroundColor,
        backgroundImage: element.styles?.backgroundImage,
        backgroundSize: element.styles?.backgroundSize,
        backgroundPosition: element.styles?.backgroundPosition,
        backgroundRepeat: element.styles?.backgroundRepeat,
        ...element.styles,
      }}
    >
      <Slider key={`slider-${element.id}`} {...settings}>
        {element.elements &&
          element.elements.map((childElement, index) => (
            <div key={childElement.id} className="h-full relative px-2 pb-8">
              <div
                className="flex items-center justify-center overflow-hidden"
                style={{ height: element.styles?.height }}
              >
                {renderElement(childElement, index)}
              </div>

              {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
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
                  disabled={index === element.elements.length - 1}
                  className="gap-1 hover:bg-gray-100"
                >
                  <span className="hidden sm:inline">Move Right</span>
                  <ArrowRightCircle className="h-4 w-4" />
                </Button>
              </div> */}
            </div>
          ))}
      </Slider>
    </motion.div>
  );
};

export default CarouselComponent;
