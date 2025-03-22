"use client";
import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  startTransition,
} from "react";
import ContextMenu from "./EditorContextMenu";
import DOMPurify from "dompurify";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import { createElements } from "@/app/utils/CreateElements";
import FrameComponents from "./editorcomponents/FrameComponents";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { motion } from "framer-motion";
import ResizeHandle from "./ResizeHandle";
import DeviceSwitcher from "./DeviceSwitcher";
import { DEVICE_SIZES } from "@/lib/constants";
import { customComponents } from "@/lib/styleconstants";
import { CreateCustomComponents } from "@/lib/utils/createCustomComponents";
import { Delete } from "@/app/api/element/route";
import Link from "next/link";

type Props = {
  projectId: string;
};

const loadedFonts = new Set<string>();
const Editor: React.FC<Props> = ({ projectId }) => {
  const { elements, dispatch } = useEditorContext();
  const { updateElementOptimistically } = useOptimisticElement();
  const [deviceView, setDeviceView] = useState<"PHONE" | "TABLET" | "DESKTOP">(
    "DESKTOP"
  );
  const [lockedTransformOrigin, setLockedTransformOrigin] =
    useState<string>("0px 0px");

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: 0,
    y: 0,
  });

  const { setSelectedElement } = useEditorContextProvider();

  const [zoom, setZoom] = useState(1);
  const [draggingElement, setDraggingElement] = useState<{
    id: string;
  } | null>(null);

  const resizingElement = useRef<HTMLDivElement>(null);
  const resizeDirection = useRef<"nw" | "ne" | "sw" | "se">("nw");
  const nwRef = useRef<HTMLDivElement>(null);
  const neRef = useRef<HTMLDivElement>(null);
  const swRef = useRef<HTMLDivElement>(null);
  const seRef = useRef<HTMLDivElement>(null);

  const editableRef = useRef<HTMLDivElement>(null);
  const draggingConstraintRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fontsToLoad = new Set<string>();
    elements.forEach((element) => {
      const fontFamily = element.styles?.fontFamily;
      if (fontFamily && !loadedFonts.has(fontFamily)) {
        fontsToLoad.add(fontFamily);
        loadedFonts.add(fontFamily);
      }
    });

    fontsToLoad.forEach((font) => {});
  }, [elements]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragStart = useCallback(
    (event: any, info: any, element: EditorElement) => {
      setDraggingElement({
        id: element.id,
      });
    },
    [setDraggingElement]
  );

  const handleDragEnd = useCallback(
    (event: any, info: any, element: EditorElement) => {
      const gridSize = 20;
      const newX = element.x + info.offset.x;
      const newY = element.y + info.offset.y;

      const x = Math.round(newX / gridSize) * gridSize;
      const y = Math.round(newY / gridSize) * gridSize;
      startTransition(() => {
        updateElementOptimistically(element.id, {
          x: x,
          y: y,
        });
      });

      setDraggingElement(null);
    },
    [updateElementOptimistically]
  );
  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const newElement = e.dataTransfer.getData("elementType");
      const newCustomElement = e.dataTransfer.getData("customElement");
      if (newElement) {
        createElements(newElement, dispatch, e.clientX, e.clientY, projectId);
      }
      if (newCustomElement) {
        const customComponent = customComponents.find(
          (component) => component.component.name === newCustomElement
        );
        if (customComponent) {
          CreateCustomComponents(
            customComponent.component,
            dispatch,
            projectId
          );
        }
      }
    },
    [dispatch]
  );

  const handleInput = useCallback(
    (e: React.FormEvent<HTMLElement>, id: string) => {
      let newContent = e.currentTarget.innerHTML;

      startTransition(() => {
        updateElementOptimistically(id, { content: newContent });
      });
    },
    [updateElementOptimistically, elements]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      e.currentTarget.focus();
      e.stopPropagation();
      setSelectedElement(element);
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { id: element.id, updates: { isSelected: true } },
      });
    },
    [dispatch]
  );

  const handleDeselectAll = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dispatch({ type: "UPDATE_ALL_ELEMENTS", payload: { isSelected: false } });
      setSelectedElement(undefined);
    },
    [dispatch]
  );

  const handleZoom = useCallback(
    (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
        event.stopPropagation();

        const delta = event.deltaY > 0 ? -0.1 : 0.1;
        const newZoom = Math.min(Math.max(zoom + delta, 0.1), 3);
        const rect = (event.target as HTMLElement).getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setLockedTransformOrigin(`${x}px ${y}px`);
        setZoom(newZoom);
      }
    },
    [zoom]
  );
  const handleResizeStart = (
    direction: "nw" | "ne" | "sw" | "se",
    elementId: string
  ) => {
    resizeDirection.current = direction;
    resizingElement.current = document.getElementById(
      elementId
    ) as HTMLDivElement;
    document.addEventListener("mousemove", handleResize);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResize = React.useCallback(
    (e: MouseEvent) => {
      const resizingElementFromRef = resizingElement.current;
      if (!resizingElementFromRef) return;

      const elementId = resizingElementFromRef.id;
      if (!elementId) return;

      const targetElement = elements.find((el) => el.id === elementId);
      if (!targetElement) return;

      const styles = window.getComputedStyle(resizingElementFromRef);
      const width = parseInt(styles.width, 10);
      const height = parseInt(styles.height, 10);
      const dX = e.movementX;

      const dY = e.movementY;

      let newWidth, newHeight;

      switch (resizeDirection.current) {
        case "nw":
          newWidth = width - dX;
          newHeight = height - dY;
          break;
        case "ne":
          newWidth = width + dX;
          newHeight = height - dY;
          break;
        case "sw":
          newWidth = width - dX;
          newHeight = height + dY;
          break;
        case "se":
          newWidth = width + dX;
          newHeight = height + dY;
          break;
      }

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: elementId,
          updates: {
            styles: {
              ...targetElement.styles,
              width: `${newWidth}px`,
              height: `${newHeight}px`,
            },
          },
        },
      });
    },
    [elements, dispatch]
  );

  const handleResizeEnd = () => {
    const element = elements.find(
      (el) => el.id === resizingElement.current?.id
    );
    if (!element) return;

    startTransition(() => {
      updateElementOptimistically(resizingElement.current?.id || "", {
        styles: {
          ...element.styles,
          width: resizingElement.current?.style.width,
          height: resizingElement.current?.style.height,
        },
      } as React.CSSProperties);
    });
    document.removeEventListener("mousemove", handleResize);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLElement>, element: EditorElement) => {
      if ((e.key === "Delete" || e.key === "Backspace") && element.isSelected) {
        const tempElement: EditorElement = element;
        try {
          dispatch({
            type: "DELETE_ELEMENT",
            payload: element.id,
          });
          Delete(element.id);
        } catch (error) {
          console.error("Failed to delete element:", error);
          dispatch({
            type: "ADD_ELEMENT",
            payload: tempElement,
          });
        }
      }
    },
    [dispatch]
  );

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, []);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      handleZoom(event);
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleZoom]);

  return (
    <div className="flex flex-col h-full w-full canva-component">
      <div className="flex flex-row absolute top-0 z-10 left-1/2 transform -translate-x-1/2">
        <DeviceSwitcher currentDevice={deviceView} onChange={setDeviceView} />
      </div>
      <div className="flex-1 overflow-hidden bg-gray-200 flex justify-center">
        <div
          style={{
            width: DEVICE_SIZES[deviceView].width,
            height: DEVICE_SIZES[deviceView].height,
            transition: "width 0.3s ease",
            maxHeight: "100%",
            overflow: "auto",
            boxShadow:
              deviceView !== "DESKTOP" ? "0 0 20px rgba(0,0,0,0.1)" : "none",
          }}
          className={`bg-white ${deviceView !== "DESKTOP" ? "rounded-md" : ""}`}
          ref={draggingConstraintRef}
        >
          <motion.div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: lockedTransformOrigin,
            }}
            id="canvas"
            onContextMenu={(e) => {
              e.preventDefault();
              handleContextMenu(e);
            }}
            onDoubleClick={(e) => {
              handleDeselectAll(e);
            }}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            tabIndex={0}
            className="w-full h-full bg-slate-300 relative overflow-auto"
          >
            {elements.map((element) => (
              <motion.div
                key={element.id}
                onDoubleClick={(e) => {
                  handleDoubleClick(e, element);
                }}
                onDragEnd={(event, info) => handleDragEnd(event, info, element)}
                onDragStart={(event, info) =>
                  handleDragStart(event, info, element)
                }
                onKeyDown={(e) => handleKeyPress(e, element)}
                drag={!element.isSelected}
                draggable={!element.isSelected}
                dragMomentum={false}
                initial={{ x: element.x, y: element.y }}
                whileDrag={{ cursor: "grabbing" }}
                tabIndex={0}
                animate={{
                  x: element.x,
                  y: element.y,
                }}
                ref={resizingElement}
                dragConstraints={draggingConstraintRef}
                style={{
                  position: "relative",
                  width: element.styles?.width || "100px",
                  height: element.styles?.height || "100px",
                }}
                className={` ${
                  element.isSelected
                    ? "border-2 border-black hover:cursor-text "
                    : "hover:cursor-pointer"
                } ${
                  draggingElement ? "border-dashed border-black border-2" : ""
                }`}
              >
                {element.type === "Text" && (
                  <div
                    id={element.id}
                    contentEditable={element.isSelected}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleInput(e, element.id)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(element.content),
                    }}
                    style={{
                      fontFamily: `"${element.styles?.fontFamily}"`,
                      height: "100%",
                      width: "100%",
                      ...element.styles,
                    }}
                    ref={editableRef}
                  />
                )}
                {element.type === "Frame" && (
                  <FrameComponents
                    setContextMenuPosition={setContextMenuPosition}
                    setShowContextMenu={setShowContextMenu}
                    element={element}
                    projectId={projectId}
                  />
                )}
                {element.type === "Image" && (
                  <img
                    src={element.src}
                    alt={`image-${element.id}`}
                    style={{ ...element.styles }}
                  />
                )}
                {element.type === "Link" && (
                  <Link
                    href={element.href || "#"}
                    style={{ ...element.styles }}
                    contentEditable={element.isSelected}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleInput(e, element.id)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(element.content),
                    }}
                  ></Link>
                )}
                {element.isSelected && (
                  <>
                    <ResizeHandle
                      direction="nw"
                      ref={nwRef}
                      onResizeStart={() => handleResizeStart("nw", element.id)}
                    />

                    <ResizeHandle
                      direction="ne"
                      ref={neRef}
                      onResizeStart={() => handleResizeStart("ne", element.id)}
                    />

                    <ResizeHandle
                      direction="sw"
                      ref={swRef}
                      onResizeStart={() => handleResizeStart("sw", element.id)}
                    />

                    <ResizeHandle
                      direction="se"
                      ref={seRef}
                      onResizeStart={() => handleResizeStart("se", element.id)}
                    />
                  </>
                )}
              </motion.div>
            ))}
            {showContextMenu && (
              <ContextMenu
                setOpen={setShowContextMenu}
                contextMenuPosition={contextMenuPosition}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
