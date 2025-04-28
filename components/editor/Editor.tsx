"use client";
import React, { useRef, useState, useEffect, startTransition } from "react";
import ContextMenu from "./contextmenu/EditorContextMenu";
import DOMPurify from "dompurify";
import { EditorElement } from "@/lib/type";
import { createElements } from "@/utils/createElements";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import ResizeHandle from "./ResizeHandle";
import DeviceSwitcher from "./DeviceSwitcher";
import { DEVICE_SIZES } from "@/lib/constants/constants";
import { customComponents } from "@/lib/customcomponents/styleconstants";
import Link from "next/link";
import CarouselComponent from "./editorcomponents/CarouselComponent";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/lib/store/editorStore";
import OptimisticFeedback from "./OptimisticFeedback";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import FrameComponents from "./editorcomponents/FrameComponents";
import WidgetComponent from "./editorcomponents/WidgetComponent";
import { CarouselElement } from "@/lib/interface";
import ListItemComponent from "./editorcomponents/ListItemComponent";
import handlePasteElement from "@/utils/handlePasteElment";
import FormComponent from "./editorcomponents/FormComponent";
import { useCanvasStore } from "@/lib/store/canvasStore";
import { ArrowUp } from "lucide-react";

type Props = {
  projectId: string;
};

const loadedFonts = new Set<string>();
const Editor: React.FC<Props> = ({ projectId }) => {
  const {
    addElementOptimistically,
    elements,
    updateElement,
    updateElementOptimistically,
    deleteElementOptimistically,
    updateAllElements,
    undo,
    redo,
  } = useEditorStore();

  const { styles } = useCanvasStore();
  const { setSelectedElement, selectedElement } = useElementSelectionStore();

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

  const [zoom, setZoom] = useState(1);
  const [draggingElement, setDraggingElement] = useState<{
    id: string;
  } | null>(null);
  const [dragLockAxis, setDragLockAxis] = useState<"x" | "y" | false>(false);
  const resizingElement = useRef<HTMLDivElement>(null);
  const resizeDirection = useRef<"nw" | "ne" | "sw" | "se">("nw");
  const nwRef = useRef<HTMLDivElement>(null);
  const neRef = useRef<HTMLDivElement>(null);
  const swRef = useRef<HTMLDivElement>(null);
  const seRef = useRef<HTMLDivElement>(null);
  const editableRef = useRef<HTMLDivElement>(null);
  const draggingConstraintRef = useRef<HTMLDivElement>(null);

  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const editorContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fontsToLoad = new Set<string>();
    elements.forEach((element) => {
      const fontFamily = element.styles?.fontFamily;
      if (fontFamily && !loadedFonts.has(fontFamily)) {
        fontsToLoad.add(fontFamily);
        loadedFonts.add(fontFamily);
      }
    });
  }, [elements]);

  const handleCopy = (element: EditorElement) => {
    const elementToSerialize = { ...element };
    window.sessionStorage.setItem(
      "editorClipboard",
      JSON.stringify(elementToSerialize)
    );

    const originalBorder = element.styles?.border;
    updateElement(element.id, {
      styles: {
        ...element.styles,
        border: "2px dashed green",
      },
    });

    setTimeout(() => {
      updateElement(element.id, {
        styles: {
          ...element.styles,
          border: originalBorder,
        },
      });
    }, 300);
  };

  const handleCut = (element: EditorElement) => {
    const elementToSerialize = { ...element };
    window.sessionStorage.setItem(
      "editorClipboard",
      JSON.stringify(elementToSerialize)
    );

    deleteElementOptimistically(element.id);
  };

  const handlePaste = () => {
    try {
      const storedElement = window.sessionStorage.getItem("editorClipboard");
      if (storedElement) {
        const parsedElement: EditorElement = JSON.parse(storedElement);

        handlePasteElement(
          parsedElement,
          addElementOptimistically,
          setSelectedElement,
          projectId,
          selectedElement
        );
      }
    } catch (error) {
      console.error("Error pasting element:", error);
    }
  };
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        undo();
      } else if (
        (e.ctrlKey || e.metaKey) &&
        (e.key === "y" || (e.shiftKey && e.key === "z"))
      ) {
        e.preventDefault();
        redo();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "c") {
        e.preventDefault();
        if (selectedElement) {
          handleCopy(selectedElement);
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === "v") {
        e.preventDefault();
        handlePaste();
      } else if ((e.ctrlKey || e.metaKey) && e.key === "x") {
        e.preventDefault();
        if (selectedElement) {
          handleCut(selectedElement);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo, selectedElement, handleCopy, handleCut, handlePaste]);

  const handleContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setShowContextMenu(true);
    setContextMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
    element: EditorElement
  ) => {
    if (!info) return;
    if (dragLockAxis === "x") {
      info.offset.y = 0;
    } else if (dragLockAxis === "y") {
      info.offset.x = 0;
    }
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
    setDragLockAxis(false);
  };

  const handleDirectionLock = (element: EditorElement) => {
    if (element.styles?.width === "100%") {
      setDragLockAxis("y");
    } else if (element.styles?.height === "100%") {
      setDragLockAxis("x");
    }
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newElement = e.dataTransfer.getData("elementType");
    const newCustomElement = e.dataTransfer.getData("customElement");
    if (newElement) {
      createElements(
        newElement,
        e.clientX,
        e.clientY,
        projectId,
        addElementOptimistically
      );
    }
    if (newCustomElement) {
      const customComponent = customComponents.find(
        (component) => component.component.name === newCustomElement
      );
      if (customComponent) {
        startTransition(() => {
          addElementOptimistically(
            customComponent.component as EditorElement,
            projectId
          );
        });
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLElement>, id: string) => {
    const newContent = e.currentTarget.innerHTML;
    startTransition(() => {
      updateElementOptimistically(id, { content: newContent });
    });
  };

  const handleDoubleClick = (
    e: React.MouseEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.currentTarget.focus();
    e.stopPropagation();
    setSelectedElement(element);
    updateElement(element.id, { isSelected: !element.isSelected });
  };

  const handleDeselectAll = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    updateAllElements({ isSelected: false });
    setSelectedElement(undefined);
  };

  const handleZoom = React.useCallback(
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
      updateElement(elementId, {
        styles: {
          ...targetElement.styles,
          width: `${newWidth}px`,
          height: `${newHeight}px`,
        },
      });
    },
    [elements, updateElement]
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

  const handleKeyPress = (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement
  ) => {
    if (e.key === "End" && element.isSelected) {
      startTransition(() => {
        deleteElementOptimistically(element.id);
      });
    }
    if (e.key === "Escape" && element.isSelected) {
      updateElement(element.id, { isSelected: false });
    }

    if (e.ctrlKey && e.key === "z") {
      e.preventDefault();
      undo();
    } else if (e.ctrlKey && e.key === "y") {
      e.preventDefault();
      redo();
    }
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("mousemove", handleResize);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [handleResize, handleResizeEnd]);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      handleZoom(event);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [handleZoom]);

  useEffect(() => {
    const editorElement = editorContainerRef.current;
    if (!editorElement) return;

    const handleScroll = () => {
      const scrollTop = editorElement.scrollTop;
      setShowScrollToTop(scrollTop > 500);
    };

    editorElement.addEventListener('scroll', handleScroll);
    return () => {
      editorElement.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    if (editorContainerRef.current) {
      editorContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div
      className="flex flex-col h-full w-full canva-component"
      style={{
        backgroundColor: styles?.backgroundColor,
        width: styles?.width,
        height: styles?.height,
        maxWidth: styles?.maxWidth,
        overflow: styles?.overflow,
        borderRadius: styles?.borderRadius,
        border: styles?.border,
        boxShadow: styles?.boxShadow,
        backdropFilter: styles?.backdropFilter,
        transition: styles?.transition,
      }}
    >
      <div className="flex flex-row absolute top-0 z-10 left-1/2 transform -translate-x-1/2">
        <DeviceSwitcher currentDevice={deviceView} onChange={setDeviceView} />
      </div>
      <div className="flex-1 overflow-auto bg-gray-200 flex justify-center">
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
              backgroundColor: styles?.backgroundColor,
              minHeight: "100%",
              height: "auto",
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
            className="w-full h-full relative overflow-auto"
            ref={editorContainerRef}
          >
            {elements.map((element) => (
              <motion.div
                key={element.id}
                onDoubleClick={(e) => handleDoubleClick(e, element)}
                onDragEnd={(e, info) => handleDragEnd(e, info, element)}
                onDragStart={() => setDraggingElement({ id: element.id })}
                onKeyDown={(e) => handleKeyPress(e, element)}
                drag={!element.isSelected}
                dragElastic={0}
                dragMomentum={false}
                initial={{ x: element.x, y: element.y }}
                whileDrag={{ cursor: "grabbing" }}
                dragDirectionLock={
                  element.styles?.width === "100%" ||
                  element.styles?.height === "100%"
                }
                onDirectionLock={() => handleDirectionLock(element)}
                dragConstraints={draggingConstraintRef}
                animate={{
                  x: element.x,
                  y: element.y,
                }}
                style={{
                  position: "absolute",
                  width: element.styles?.width || "100px",
                  height: element.styles?.height || "100px",
                  zIndex: element.isSelected ? 10 : 1,
                }}
                className={cn("cursor-pointer", "", {
                  "border-2 border-black hover:cursor-text": element.isSelected,
                  "border-dashed border-black border-2":
                    draggingElement?.id === element.id,
                })}
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
                {element.type === "Frame" &&
                element.name?.includes("Widget") ? (
                  <WidgetComponent
                    setContextMenuPosition={setContextMenuPosition}
                    setShowContextMenu={setShowContextMenu}
                    element={element}
                    projectId={projectId}
                  />
                ) : (
                  element.type === "Frame" && (
                    <FrameComponents
                      setContextMenuPosition={setContextMenuPosition}
                      setShowContextMenu={setShowContextMenu}
                      element={element}
                      projectId={projectId}
                    />
                  )
                )}
                {element.type === "Carousel" && (
                  <CarouselComponent
                    setContextMenuPosition={setContextMenuPosition}
                    setShowContextMenu={setShowContextMenu}
                    element={element as CarouselElement}
                    projectId={projectId}
                  />
                )}
                {element.type === "ListItem" && (
                  <ListItemComponent
                    element={element}
                    setContextMenuPosition={setContextMenuPosition}
                    setShowContextMenu={setShowContextMenu}
                    projectId={projectId}
                  />
                )}
                {element.type === "Form" && (
                  <FormComponent
                    setContextMenuPosition={setContextMenuPosition}
                    setShowContextMenu={setShowContextMenu}
                    element={element}
                    projectId={projectId}
                  />
                )}
                {element.type === "Button" && (
                  <button
                    style={{ ...element.styles }}
                    contentEditable={element.isSelected}
                    suppressContentEditableWarning={true}
                    onBlur={(e) => handleInput(e, element.id)}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(element.content),
                    }}
                  />
                )}
                {element.type === "Image" && (
                  <img
                    src={element.src}
                    alt={`image-${element.id}`}
                    style={{ ...element.styles, pointerEvents: "none" }}
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

      <AnimatePresence>
        {showScrollToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-72 z-50 flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <OptimisticFeedback />
    </div>
  );
};

export default Editor;
