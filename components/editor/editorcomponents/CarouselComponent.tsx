import { CarouselElement, EditorElement } from "@/lib/type";
import React, { useCallback } from "react";
import Slider from "react-slick";
import FrameComponents from "./FrameComponents";
import { motion } from "framer-motion";
import DOMPurify from "dompurify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEditorContext } from "@/lib/context";
import createElements from "@/app/utils/CreateFrameElements";

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
  const { dispatch } = useEditorContext();

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const elementType = e.dataTransfer.getData("elementType");
      createElements(elementType, dispatch, element, projectId);
    },
    [dispatch, projectId, element]
  );

  const renderElement = useCallback(
    (element: EditorElement) => {
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
              alt=""
              style={{ ...element.styles }}
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
    },
    [setContextMenuPosition, setShowContextMenu, projectId]
  );

  const carouselSettings = React.useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
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
    }),
    []
  );

  return (
    <div
      id={element.id}
      onDrop={handleDrop}
      className="slider-container m-8"
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      style={{ minHeight: "100px" }}
      onDoubleClick={() => console.log(element)}
    >
      <Slider {...carouselSettings}>
        {element.elements?.map((childElement) => (
          <div key={childElement.id} className="slick-slide h-full w-full ">
            <div className="h-full w-full flex items-center justify-center ">
              {renderElement(childElement)}
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
