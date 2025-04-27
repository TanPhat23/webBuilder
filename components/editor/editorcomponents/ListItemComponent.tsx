import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ListElement, EditorComponentProps } from "@/lib/interface";
import { EditorElement } from "@/lib/type";
import ButtonComponent from "./ButtonComponent";
import FrameComponents from "./FrameComponents";
import { useEditorElementHandlers } from "@/hooks/useEditorElementHandlers";
import { ChevronDown, List } from "lucide-react";

type ListItemProps = EditorComponentProps & {
  parentHandlers?: {
    handleDrop: (
      e: React.DragEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleDoubleClick: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleContextMenu: (
      e: React.MouseEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    handleImageDrop: (
      e: React.DragEvent<HTMLElement>,
      element: EditorElement
    ) => void;
    getContentProps: (element: EditorElement) => {
      dangerouslySetInnerHTML: { __html: string };
    };
    getCommonProps: (element: EditorElement) => unknown;
    draggingElement: EditorElement | null;
  };
};

const ListItemComponent = (props: ListItemProps) => {
  const {
    element,
    projectId,
    setContextMenuPosition,
    setShowContextMenu,
    parentHandlers,
  } = props;

  const [showBulletConfig, setShowBulletConfig] = useState(false);
  const listElement = element as ListElement;

  const [currentBulletStyle, setCurrentBulletStyle] = useState<string>(
    listElement.bulletStyle || "disc"
  );

  useEffect(() => {
    setCurrentBulletStyle(listElement.bulletStyle || "disc");
  }, [listElement.bulletStyle]);

  const hookHandlers = useEditorElementHandlers(props);

  const {
    handleDoubleClick,
    handleContextMenu,
    handleDrop,
    handleImageDrop,
    getContentProps,
    getCommonProps,
    draggingElement,
  } = parentHandlers || hookHandlers;

  const renderElement = (element: EditorElement): React.ReactNode => {
    const commonProps = getCommonProps(element);
    const contentProps = getContentProps(element);

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
      case "ListItem":
        return (
          <ListItemComponent
            key={element.id}
            element={element}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
            projectId={projectId}
            parentHandlers={{
              handleDrop,
              handleDoubleClick,
              handleContextMenu,
              handleImageDrop,
              getContentProps,
              getCommonProps,
              draggingElement,
            }}
          />
        );
      case "Image":
        if (element.src) {
          return (
            <motion.img
              key={element.id}
              src={element.src}
              onDrop={(e: React.DragEvent<HTMLImageElement>) =>
                handleImageDrop(e, element)
              }
              {...commonProps}
            />
          );
        } else {
          return (
            <motion.div
              key={element.id}
              onDrop={(e: React.DragEvent<HTMLDivElement>) =>
                handleImageDrop(e, element)
              }
              {...commonProps}
              {...contentProps}
            />
          );
        }
      case "Button":
        return (
          <ButtonComponent
            key={element.id}
            element={element}
            projectId={projectId}
            draggingElement={draggingElement}
            commonProps={commonProps}
            setContextMenuPosition={setContextMenuPosition}
            setShowContextMenu={setShowContextMenu}
          />
        );
      default:
        return <motion.p key={element.id} {...commonProps} {...contentProps} />;
    }
  };

  const getListStyleType = () => {
    switch (currentBulletStyle) {
      case "disc":
        return "disc";
      case "circle":
        return "circle";
      case "square":
        return "square";
      case "decimal":
        return "decimal";
      case "roman":
        return "lower-roman";
      case "alpha":
        return "lower-alpha";
      case "none":
        return "none";
      default:
        return "disc";
    }
  };

  const changeBulletStyle = (
    bulletStyle: "disc" | "circle" | "square" | "decimal" | "roman" | "alpha" | "none"
  ) => {
    setCurrentBulletStyle(bulletStyle);

    const event = new CustomEvent("updateElement", {
      detail: {
        id: element.id,
        changes: { bulletStyle },
      },
    });
    document.dispatchEvent(event);
    setShowBulletConfig(false);
  };

  const getBulletStyleLabel = () => {
    switch (currentBulletStyle) {
      case "disc":
        return "• Disc";
      case "circle":
        return "◦ Circle";
      case "square":
        return "▪ Square";
      case "decimal":
        return "1. Decimal";
      case "roman":
        return "i. Roman";
      case "alpha":
        return "a. Alpha";
      case "none":
        return "None";
      default:
        return "• Disc";
    }
  };

  return (
    <div className="relative">
      {element.isSelected && (
        <div className="absolute -top-8 left-0 flex items-center gap-1 bg-white border border-gray-200 shadow-sm rounded px-2 py-1 text-xs z-10">
          <button
            className="flex items-center gap-1.5 hover:bg-gray-100 rounded px-2 py-1"
            onClick={() => setShowBulletConfig(!showBulletConfig)}
          >
            <List size={14} />
            <span>{getBulletStyleLabel()}</span>
            <ChevronDown size={14} />
          </button>

          {showBulletConfig && (
            <div className="absolute top-8 left-0 z-50 bg-white border border-gray-200 shadow-md rounded-md p-1 min-w-[120px]">
              <div className="px-2 pb-1 text-xs text-gray-500 border-b">
                Bullet Style
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "disc" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("disc")}
              >
                • Disc
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "circle" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("circle")}
              >
                ◦ Circle
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "square" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("square")}
              >
                ▪ Square
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "decimal" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("decimal")}
              >
                1. Decimal
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "roman" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("roman")}
              >
                i. Roman
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "alpha" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("alpha")}
              >
                a. Alpha
              </div>
              <div
                className={`px-2 py-1 hover:bg-gray-100 cursor-pointer ${
                  currentBulletStyle === "none" ? "bg-blue-50 text-blue-600" : ""
                }`}
                onClick={() => changeBulletStyle("none")}
              >
                None
              </div>
            </div>
          )}
        </div>
      )}

      <motion.ul
        id={element.id}
        style={{
          ...element.styles,
          listStyleType: getListStyleType(),
        }}
        onDrop={(e) => handleDrop(e, element)}
        onDragOver={(e) => e.preventDefault()}
        tabIndex={0}
        drag={!element.isSelected}
        dragMomentum={false}
        dragSnapToOrigin={true}
        dragElastic={0.1}
        onDoubleClick={(e) => handleDoubleClick(e, element)}
        onContextMenu={(e) => handleContextMenu(e, element)}
        className={cn("pl-5", element.tailwindStyles, {
          "border-black border-2 border-solid": element.isSelected,
        })}
      >
        {(element as ListElement).elements?.map((childElement) => (
          <li key={childElement.id}>{renderElement(childElement)}</li>
        ))}
      </motion.ul>
    </div>
  );
};

export default ListItemComponent;
