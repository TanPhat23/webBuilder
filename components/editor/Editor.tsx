import React, { useRef, useState, useCallback, useEffect } from "react";
import ContextMenu from "./EditorContextMenu";
import DOMPurify from "dompurify";
import { useEditorContext } from "@/lib/context";
import { Element } from "@/lib/type";

const Editor = () => {
  const { elements, dispatch } = useEditorContext();

  const [showContextMenu, setShowContextMenu] = useState(false);
  const [selectedElement, setSelectedElement] = useState<Element>();
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
    dispatch({
      type: "SAVE_ELEMENTS_TO_LOCAL_STORAGE",
      payload: elements,
    })
  }, [elements, dispatch]);

  const onContextMenu = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      e.preventDefault();
      const selectElement = elements.find((element) => element.id === id);
      if (selectElement?.isSelected) {
        setMenuPosition({ x: e.clientX, y: e.clientY });
        setShowContextMenu(true);
        setSelectedElement(selectElement);
        console.log(selectElement);
      }
    },
    [elements]
  );

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const newElement = e.dataTransfer.getData("elementType");
      if (newElement) {
        dispatch({
          type: "ADD_ELEMENT",
          payload: {
            type: newElement,
            id: newElement + "-" + Date.now(),
            content: newElement,
            isSelected: false,
            x: e.clientX,
            y: e.clientY,
            styles: {
              height: "50px",
              width: "100px",
            },
          },
        });
      }
    },
    [dispatch]
  );

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
    (e: React.FormEvent<HTMLDivElement>, id: string) => {
      let newContent = e.currentTarget.innerHTML;

      if (newContent.includes("<br>")) {
        newContent = newContent.replace(/<br>/g, "");
      }

      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = newContent;

      const anchorElement = tempDiv.querySelector("a");
      if (anchorElement) {
        const href = anchorElement.getAttribute("href") || "";
        const textContent = tempDiv.textContent || "";
        let updatedContent = `<a href="${href}">${textContent}</a>`;

        if (updatedContent.includes("<br>")) {
          updatedContent = updatedContent.replace(/<br>/g, "");
        }
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: { id, updates: { content: updatedContent } },
        });
      } else {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: { id, updates: { content: newContent } },
        });
      }
    },
    [dispatch]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>, id: string) => {
      if (e.key === "End") {
        dispatch({ type: "DELETE_ELEMENT", payload: id });
      }
    },
    [dispatch]
  );

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, id: string) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { id, updates: { isSelected: true } },
      });
    },
    [dispatch]
  );

  const handleDeselectAll = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      dispatch({ type: "UPDATE_ALL_ELEMENTS", payload: { isSelected: false } });
    },
    [dispatch]
  );

  const onMouseDown = (
    e: React.MouseEvent<HTMLDivElement>,
    id: string,
    selected: boolean
  ) => {
    const element = elements.find((element) => element.id === id);
    if (selected) {
      e.stopPropagation();
      return;
    }
    if (element) {
      const offsetX = e.clientX - element.x;
      const offsetY = e.clientY - element.y;

      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id,
          updates: { isSelected: true, styles: { border: "2px dotted black" } },
        },
      });
      setDraggingElement({ id, offsetX, offsetY });
    }
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (draggingElement) {
        const x = e.clientX - draggingElement.offsetX;
        const y = e.clientY - draggingElement.offsetY;

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: { id: draggingElement.id, updates: { x, y } },
        });
        dispatch({type:"UPDATE_ALL_ELEMENTS", payload: {isSelected: false, styles: {border: "2px dotted black"}}})
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

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id,
            updates: {
              styles: {
                width: `${newWidth}px`,
                height: `${newHeight}px`,
              },
            },
          },
        });
      }
    },
    [draggingElement, resizingElement, dispatch]
  );

  const onMouseUp = useCallback(() => {
    if (draggingElement) {
      const element = elements.find((e) => e.id === draggingElement.id);
      if (element) {
        const x = Math.round(element.x / gridSize) * gridSize;
        const y = Math.round(element.y / gridSize) * gridSize;

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: { id: draggingElement.id, updates: { x, y, styles: {border: ""} } },
        });
        dispatch({
          type: "UPDATE_ALL_ELEMENTS",
          payload: {
            isSelected: false,
            styles: { border: "" },
          },
        });
        
      }
      setDraggingElement(null);
    } else if (resizingElement) {
      setResizingElement(null);
    }
  }, [draggingElement, resizingElement, elements, dispatch, gridSize]);

  return (
    <div
      id="canvas"
      onClick={handleDeselectAll}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
      onDoubleClick={(e) => {
        if (showContextMenu) setShowContextMenu(false);
      }}
      onDrop={onDrop}
      onDragOver={(e) => e.preventDefault()}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className="w-screen h-auto bg-slate-300 overflow-hidden"
    >
      {elements.map((element) => (
        <div
          key={element.id}
          onContextMenu={(e) => onContextMenu(e, element.id)}
          onDoubleClick={(e) => handleDoubleClick(e, element.id)}
          onMouseDown={(e) => onMouseDown(e, element.id, element.isSelected)}
          onKeyDown={(e) => handleKeyDown(e, element.id)}
          tabIndex={0}
          style={{
            position: "absolute",
            left: element.x,
            top: element.y,
            width: element.styles?.width || "100px",
            height: element.styles?.height || "50px",
            ...element.styles,
          }}
          className={`hover:bg-slate-100`}
        >
          <div
            role="textbox"
            aria-multiline="true"
            contentEditable={element.isSelected}
            suppressContentEditableWarning={true}
            onClick={(e) => {
              e.stopPropagation();
              e.currentTarget.focus();
            }}
            onBlur={(e) => handleInput(e, element.id)}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(element.content),
            }}
            style={{ height: "100%", width: "100%" }}
            ref={editableRef}
          />

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
          selectedElement={selectedElement}
          onClose={() => setShowContextMenu(false)}
        />
      )}
    </div>
  );
};

export default Editor;
