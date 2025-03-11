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
import { blobToBase64 } from "@/app/utils/HandleImage";
import { createElements } from "@/app/utils/CreateElements";
import { v4 as uuidv4 } from "uuid";
import FrameComponents from "./editorcomponents/FrameComponents";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";

type Props = {
  projectId: string;
};

const loadedFonts = new Set<string>();
const Editor = ({ projectId }: Props) => {
  const { elements, dispatch } = useEditorContext();
  const { optimisticElements, updateElementOptimistically } =
    useOptimisticElement();

  const { uploadImages, setUploadImages } = useImageUploadContext();
  const [showContextMenu, setShowContextMenu] = useState(false);
  const { selectedElement, setSelectedElement } = useEditorContextProvider();
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const [draggingElement, setDraggingElement] = useState<{
    id: string;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  const [resizingElement, setResizingElement] = useState<{
    id: string;
    direction: "nw" | "ne" | "sw" | "se";
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
  } | null>(null);

  const gridSize = 20;

  const editableRef = useRef<HTMLDivElement>(null);

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
  // const handleCopy = useCallback(
  //   (e: React.ClipboardEvent<HTMLDivElement>) => {
  //     const selectedElement = elements.find((element) => element.isSelected);
  //     if (selectedElement) {
  //       const textToCopy = JSON.stringify(selectedElement);

  //       if (navigator.clipboard) {
  //         navigator.clipboard.writeText(textToCopy).then(() => {
  //           console.log("Element copied to clipboard:", selectedElement);
  //         });
  //       }
  //     }
  //     setShowContextMenu(false);
  //   },
  //   [elements]
  // );

  // const handlePaste = useCallback(
  //   async (e: React.ClipboardEvent<HTMLDivElement>) => {
  //     try {
  //       const clipboardItems = await navigator.clipboard.read();

  //       for (const item of clipboardItems) {
  //         if (item.types.includes("image/png")) {
  //           const blob = await item.getType("image/png");
  //           const base64 = await blobToBase64(blob);

  //           setUploadImages([...uploadImages, base64]);
  //           const newElement: EditorElement = {
  //             type: "Img",
  //             id: `Img-${uuidv4()}`,
  //             content: "",
  //             isSelected: false,
  //             x: 50,
  //             y: 50,
  //             styles: {
  //               height: "50px",
  //               width: "100px",
  //               textAlign: "center",
  //             },
  //             src: base64,
  //             projectId: projectId,
  //           };

  //           dispatch({
  //             type: "ADD_ELEMENT",
  //             payload: newElement,
  //           });

  //           return;
  //         }

  //         if (item.types.includes("text/plain")) {
  //           const text = await item.getType("text/plain");
  //           const textContent = await text.text();

  //           try {
  //             const clipboardText: EditorElement = JSON.parse(textContent);
  //             const newElement: EditorElement = {
  //               type: clipboardText.type,
  //               id: `${clipboardText.type}-${uuidv4()}`,
  //               content: clipboardText.content,
  //               isSelected: false,
  //               x: clipboardText.x + 50,
  //               y: clipboardText.y + 50,
  //               styles: {
  //                 ...clipboardText.styles,
  //               },
  //               src: clipboardText.src,
  //               href: clipboardText.href,
  //               projectId: projectId,
  //             };

  //             dispatch({
  //               type: "ADD_ELEMENT",
  //               payload: newElement,
  //             });
  //           } catch (err) {
  //             console.error("Failed to parse clipboard text as JSON:", err);
  //           }
  //         }
  //       }
  //     } catch (err) {
  //       console.error("Failed to read clipboard data:", err);
  //     }
  //   },
  //   [dispatch]
  // );

  const onResizeHandleMouseDown = useCallback(
    (
      e: React.MouseEvent<HTMLDivElement>,
      id: string,
      direction: "nw" | "ne" | "sw" | "se"
    ) => {
      e.stopPropagation();
      const element = elements.find((element) => element.id === id);
      if (element && element.styles) {
        setResizingElement({
          id,
          direction,
          startX: e.clientX,
          startY: e.clientY,
          startWidth: parseInt(element.styles.width?.toString() || "100", 10),
          startHeight: parseInt(element.styles.height?.toString() || "50", 10),
        });
      }
    },
    [elements]
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

  // const handleKeyDown = useCallback(
  //   (e: React.KeyboardEvent<HTMLDivElement>, element: EditorElement) => {
  //     console.log("Key down:", e.key);
  //     e.preventDefault();
  //     const id = element.id;
  //     if (e.key === "Backspace") {
  //       dispatch({ type: "DELETE_ELEMENT", payload: id });
  //     }
  //     if (e.key === "Escape") {
  //       dispatch({
  //         type: "UPDATE_ELEMENT",
  //         payload: { id, updates: { isSelected: false } },
  //       });
  //     }
  //   },
  //   [dispatch]
  // );
  const handleEditorKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "z" && e.ctrlKey) {
        e.preventDefault();

        dispatch({ type: "UNDO", payload: elements });
      }
      if (e.key === "y" && e.ctrlKey) {
        e.preventDefault();
        dispatch({ type: "REDO", payload: elements });
      }
    },
    [dispatch, elements, selectedElement]
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

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    selected: boolean
  ) => {
    const element = elements.find((element) => element.id === id);

    const target = e.target as HTMLElement;
    if (
      (target.closest("button") ||
        target.closest("input") ||
        target.closest("a")) &&
      !selected
    ) {
      return;
    }
    if (selected) {
      e.stopPropagation();
      return;
    }
    if (element) {
      const canvas = document.getElementById("canvas");

      const offsetX = e.clientX - element.x;
      const offsetY = e.clientY - element.y;

      if (!canvas) return;
      if (
        offsetX > canvas?.getBoundingClientRect().width - 20 ||
        offsetY > canvas?.getBoundingClientRect().height - 20 ||
        offsetX < 20 ||
        offsetY < 20
      ) {
        return;
      }

      startTransition(() => {
        updateElementOptimistically(id, {
          styles: { ...element.styles },
        });
      });
      setDraggingElement({ id, offsetX, offsetY });
    }
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingElement) {
        const canvas = document.getElementById("canvas");
        if (!canvas) return;

        const canvasRect = canvas.getBoundingClientRect();
        const element = elements.find((e) => e.id === draggingElement.id);
        if (!element) return;

        const newX = e.clientX - draggingElement.offsetX;
        const newY = e.clientY - draggingElement.offsetY;

        const elementWidth = parseInt(
          element.styles?.width?.toString() || "100",
          10
        );
        const elementHeight = parseInt(
          element.styles?.height?.toString() || "50",
          10
        );

        const boundedX = Math.max(
          0,
          Math.min(newX, canvasRect.width - elementWidth)
        );
        const boundedY = Math.max(0, Math.min(newY, canvasRect.height + 5));

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: draggingElement.id,
            updates: { x: boundedX, y: boundedY },
          },
        });
      } else if (resizingElement) {
        const { id, direction, startX, startY, startWidth, startHeight } =
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

        const canvas = document.getElementById("canvas");
        if (canvas) {
          const canvasRect = canvas.getBoundingClientRect();
          const element = elements.find((e) => e.id === id);
          if (element) {
            newWidth = Math.max(
              50,
              Math.min(newWidth, canvasRect.width - element.x)
            );
            newHeight = Math.max(
              50,
              Math.min(newHeight, canvasRect.height - element.y)
            );
          }
        }

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id,
            updates: {
              styles: {
                ...elements.find((element) => element.id === id)?.styles,
                width: `${newWidth}px`,
                height: `${newHeight}px`,
              },
            },
          },
        });
      }
    },
    [draggingElement, resizingElement, dispatch, elements]
  );

  const onMouseUp = useCallback(() => {
    if (draggingElement) {
      const element = elements.find((e) => e.id === draggingElement.id);
      if (element) {
        const x = Math.round(element.x / gridSize) * gridSize;
        const y = Math.round(element.y / gridSize) * gridSize;

        startTransition(() => {
          updateElementOptimistically(draggingElement.id, {
            x,
            y,
            styles: { ...element.styles },
          });
        });
      }
      setDraggingElement(null);
    } else if (resizingElement) {
      setResizingElement(null);
    }
  }, [
    draggingElement,
    resizingElement,
    elements,
    updateElementOptimistically,
    gridSize,
  ]);

  return (
    <div
      id="canvas"
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onDoubleClick={(e) => {
        handleDeselectAll(e);
        if (showContextMenu) setShowContextMenu(false);
      }}
      onDrop={onDrop}
      onKeyDown={(e) => handleEditorKeyDown(e)}
      onDragOver={(e) => e.preventDefault()}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      // onPaste={(e) => handlePaste(e)}
      tabIndex={0}
      className="w-full h-full bg-slate-300 relative overflow-auto"
    >
      {elements.map((element) => (
        <div
          key={element.id}
          onContextMenu={(e) => onContextMenu(e, element.id)}
          onDoubleClick={(e) => {
            handleDoubleClick(e, element);
          }}
          onMouseDown={(e) => onMouseDown(e, element.id, element.isSelected)}
          // onKeyDown={(e) => handleKeyDown(e, element)}
          // onCopy={(e) => handleCopy(e)}
          tabIndex={0}
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.styles?.width || "100px",
            height: element.styles?.height || "100px",
          }}
          className={` ${
            element.isSelected
              ? "border-2 border-black hover:cursor-text "
              : "hover:cursor-pointer"
          } ${
            draggingElement || resizingElement
              ? "border-dashed border-black border-2"
              : ""
          }`}
        >
          {element.type === "Button" && (
            <button
              id={element.id}
              contentEditable={element.isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInput(e, element.id)}
              style={{
                pointerEvents: "none",
                ...element.styles,
              }}
            >
              {element.content}
            </button>
          )}
          {element.type === "Text" && (
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
          )}
          {element.type === "Img" && element.src && (
            <div className="flex justify-center items-center h-full w-full">
              <img
                src={element.src}
                alt="uploaded"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  pointerEvents: "none",
                }}
              />
            </div>
          )}
          {element.type === "A" && (
            <a
              id={element.id}
              href={element.href}
              contentEditable={element.isSelected}
              suppressContentEditableWarning={true}
              onBlur={(e) => handleInput(e, element.id)}
              style={{
                width: "90%",
                height: "90%",
                ...element.styles,
                pointerEvents: "none",
              }}
            >
              {element.content}
            </a>
          )}
          {element.type === "Frame" && (
            <FrameComponents
              element={element}
              setShowContextMenu={setShowContextMenu}
              setMenuPosition={setMenuPosition}
              projectId={projectId}
            />
          )}
          {element.isSelected && (
            <>
              <div
                className="resize-handle resize-handle-se"
                onMouseDown={(e) =>
                  onResizeHandleMouseDown(e, element.id, "se")
                }
              />
              <div
                className="resize-handle resize-handle-sw"
                onMouseDown={(e) =>
                  onResizeHandleMouseDown(e, element.id, "sw")
                }
              />
              <div
                className="resize-handle resize-handle-ne"
                onMouseDown={(e) =>
                  onResizeHandleMouseDown(e, element.id, "ne")
                }
              />
              <div
                className="resize-handle resize-handle-nw"
                onMouseDown={(e) =>
                  onResizeHandleMouseDown(e, element.id, "nw")
                }
              />
            </>
          )}
        </div>
      ))}
      {showContextMenu && (
        <ContextMenu
          x={menuPosition.x}
          y={menuPosition.y}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </div>
  );
};

export default Editor;
