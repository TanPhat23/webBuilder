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
import {
  useEditorContext,
  useEditorContextProvider,
  useImageUploadContext,
} from "@/lib/context";
import { EditorElement } from "@/lib/type";
import { createElements } from "@/app/utils/CreateElements";
import FrameComponents from "./editorcomponents/FrameComponents";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { motion } from "framer-motion";
import ResizeHandle from "./ResizeHandle";
import DeviceSwitcher from "./DeviceSwitcher";
import { DEVICE_SIZES } from "@/lib/constants";

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
  const [debouncedWidth, setDebouncedWidth] = useState(100);
  const [debouncedHeight, setDebouncedHeight] = useState(100);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const { uploadImages, setUploadImages } = useImageUploadContext();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { setSelectedElement } = useEditorContextProvider();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [draggingElement, setDraggingElement] = useState<{
    id: string;
  } | null>(null);
  const [resizingElement, setResizingElement] = useState<{
    element: EditorElement;
    direction: "nw" | "ne" | "sw" | "se";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const editableRef = useRef<HTMLDivElement>(null);
  const draggingContraintRef = useRef<HTMLDivElement>(null);
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

  const onContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.preventDefault();

      const selectElement = elements.find((element) => element.id === id);
      if (selectElement?.isSelected) {
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        setSelectedElement(selectElement);
      }
    },
    [elements]
  );

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
      if (newElement) {
        createElements(newElement, dispatch, e.clientX, e.clientY, projectId);
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

  const handleResizeStart = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      element: EditorElement,
      direction: "nw" | "ne" | "sw" | "se"
    ) => {
      e.stopPropagation();
      setResizingElement({
        element: element,
        direction,
        startX: e.clientX,
        startY: e.clientY,
        startWidth: parseInt(element.styles?.width?.toString() || "100", 10),
        startHeight: parseInt(element.styles?.height?.toString() || "100", 10),
      });
    },
    [resizingElement]
  );

  const handleResize = useCallback(
    (e: MouseEvent) => {
      if (resizingElement) {
        const { element, direction, startX, startY, startWidth, startHeight } =
          resizingElement;
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        let newWidth = startWidth;
        let newHeight = startHeight;

        switch (direction) {
          case "se":
            newWidth = startWidth + deltaX;
            newHeight = startHeight + deltaY;
            break;
          case "sw":
            newWidth = startWidth - deltaX;
            newHeight = startHeight + deltaY;
            break;
          case "ne":
            newWidth = startWidth + deltaX;
            newHeight = startHeight - deltaY;
            break;
          case "nw":
            newWidth = startWidth - deltaX;
            newHeight = startHeight - deltaY;
            break;
        }
        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
        }

        debounceTimerRef.current = setTimeout(() => {
          dispatch({
            type: "UPDATE_ELEMENT",
            payload: {
              id: element.id,
              updates: {
                styles: {
                  ...element.styles,
                  width: `${newWidth}px`,
                  height: `${newHeight}px`,
                },
              },
            },
          });
        }, 100);
        setDebouncedWidth(newWidth);
        setDebouncedHeight(newHeight);

        element.styles = {
          ...element.styles,
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        };
      }
    },
    [resizingElement, updateElementOptimistically]
  );

  const handleResizeEnd = useCallback(() => {
    startTransition(() => {
      if (resizingElement) {
        updateElementOptimistically(resizingElement.element.id, {
          styles: {
            ...resizingElement.element.styles,
            width: `${debouncedWidth}px`,
            height: `${debouncedHeight}px`,
          },
        });
      }
    });
    setResizingElement(null);
  }, []);

  const handleZoom = useCallback((event: React.WheelEvent<HTMLElement>) => {
    if (event.ctrlKey) {
      event.preventDefault();
      event.stopPropagation();
      if (event.deltaY > 0) {
        setZoom((prev) => prev - 0.1);
      } else {
        setZoom((prev) => prev + 0.1);
      }
    }
  }, []);

  useEffect(() => {
    if (resizingElement) {
      window.addEventListener("mousemove", handleResize);
      window.addEventListener("mouseup", handleResizeEnd);
    } else {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    }

    return () => {
      window.removeEventListener("mousemove", handleResize);
      window.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [resizingElement, handleResize, handleResizeEnd]);

  return (
    <div className="flex flex-col h-full">
      <DeviceSwitcher currentDevice={deviceView} onChange={setDeviceView} />
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
          ref={draggingContraintRef}
        >
          <motion.div
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            onWheel={handleZoom}
            id="canvas"
            onContextMenu={(e) => {
              e.preventDefault();
            }}
            onDoubleClick={(e) => {
              handleDeselectAll(e);
              if (showContextMenu) setShowContextMenu(false);
            }}
            onDrop={onDrop}
            onDragOver={(e) => e.preventDefault()}
            tabIndex={0}
            className="w-full h-full bg-slate-300 relative overflow-auto"
          >
            {elements.map((element) => (
              <motion.div
                key={element.id}
                onContextMenu={(e) => onContextMenu(e, element.id)}
                onDoubleClick={(e) => {
                  handleDoubleClick(e, element);
                }}
                onDragEnd={(event, info) => handleDragEnd(event, info, element)}
                onDragStart={(event, info) =>
                  handleDragStart(event, info, element)
                }
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
                dragConstraints={draggingContraintRef}
                style={{
                  position: "relative",
                  width: element.styles?.width || "100px",
                  height: element.styles?.height || "100px",
                }}
                className={`hover:bg-white ${
                  element.isSelected
                    ? "border-2 border-black hover:cursor-text "
                    : "hover:cursor-pointer"
                } ${
                  draggingElement ? "border-dashed border-black border-2" : ""
                }`}
              >
                {element.type !== "Frame" ? (
                  <div
                    id={element.id}
                    role="textbox"
                    aria-multiline="true"
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
                ) : (
                  <FrameComponents
                    element={element}
                    setShowContextMenu={setShowContextMenu}
                    setMenuPosition={setMenuPosition}
                    projectId={projectId}
                  />
                )}
                {element.isSelected && (
                  <>
                    <ResizeHandle
                      direction="nw"
                      onMouseDown={(direction) =>
                        handleResizeStart(
                          window.event as any,
                          element,
                          direction
                        )
                      }
                    />
                    <ResizeHandle
                      direction="ne"
                      onMouseDown={(direction) =>
                        handleResizeStart(
                          window.event as any,
                          element,
                          direction
                        )
                      }
                    />
                    <ResizeHandle
                      direction="sw"
                      onMouseDown={(direction) =>
                        handleResizeStart(
                          window.event as any,
                          element,
                          direction
                        )
                      }
                    />
                    <ResizeHandle
                      direction="se"
                      onMouseDown={(direction) =>
                        handleResizeStart(
                          window.event as any,
                          element,
                          direction
                        )
                      }
                    />
                  </>
                )}
              </motion.div>
            ))}
            {showContextMenu && (
              <ContextMenu
                x={menuPosition.x}
                y={menuPosition.y}
                onClose={() => setShowContextMenu(false)}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
