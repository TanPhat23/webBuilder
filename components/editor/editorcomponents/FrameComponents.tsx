import createElements from "@/app/utils/CreateFrameElements";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement, FrameElement } from "@/lib/type";
import React, { startTransition } from "react";

type Props = {
  element: EditorElement;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
  projectId: string;
};

const FrameComponents = ({
  projectId,
  element,
  setShowContextMenu,
  setMenuPosition,
}: Props) => {
  const { dispatch } = useEditorContext();
  const { setSelectedElement } = useEditorContextProvider();
  const { updateElementOptimistically } = useOptimisticElement();
  const normalizeHtmlContent = (html: string): string => {
    html = html.replace(/&nbsp;/g, " ");

    html = html.replace(/<div>/g, "<br>").replace(/<\/div>/g, "");

    html = html.replace(/<br>\s*<br>/g, "<br>");

    return html;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    element: EditorElement
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      document.execCommand("insertHTML", false, "<br><br>");
    } else if (e.key === " ") {
      e.preventDefault();
      document.execCommand("insertText", false, " ");
    }
  };
  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      const elementType = e.dataTransfer.getData("elementType");

      createElements(elementType, dispatch, element as FrameElement, projectId);
    },
    [dispatch]
  );

  const handleDoubleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      if (!element.isSelected) setSelectedElement(element);
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            isSelected: !element.isSelected,
          },
        },
      });
    },
    [dispatch]
  );

  const handleInput = (
    e: React.FormEvent<HTMLElement>,
    element: EditorElement
  ) => {
    e.preventDefault();
    e.stopPropagation();
    let newContent = e.currentTarget.innerHTML;
    newContent = normalizeHtmlContent(newContent);
    startTransition(() => {
      updateElementOptimistically(element.id, { content: newContent });
    });
  };
  const handleContextMenu = React.useCallback(
    (e: React.MouseEvent, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      setSelectedElement(element);
      setMenuPosition({ x: e.clientX, y: e.clientY });
      setShowContextMenu(true);
    },
    [dispatch]
  );
  const renderElement = (element: EditorElement) => {
    switch (element.type) {
      case "Frame":
        return (
          <FrameComponents
            projectId={projectId}
            key={element.id}
            element={element}
            setShowContextMenu={setShowContextMenu}
            setMenuPosition={setMenuPosition}
          />
        );
      case "Button":
        return (
          <button
            key={element.id}
            style={{ ...element.styles }}
            onDoubleClick={(e) => handleDoubleClick(e, element)}
            onKeyDown={(e) => handleKeyDown(e, element)}
            contentEditable={element.isSelected}
            onContextMenu={(e) => handleContextMenu(e, element)}
            suppressContentEditableWarning
            className={`scale-x-75 ${
              element.isSelected ? "border-black border-2 border-solid" : ""
            }`}
          >
            {element.content}
          </button>
        );
      default:
        return (
          <div
            key={element.id}
            style={{ ...element.styles }}
            className={`scale-x-75 ${
              element.isSelected ? "border-black border-2 border-solid" : ""
            }`}
            contentEditable={element.isSelected}
            onContextMenu={(e) => handleContextMenu(e, element)}
            onKeyDown={(e) => handleKeyDown(e, element)}
            suppressContentEditableWarning
            onBlur={(e) => handleInput(e, element)}
            onDoubleClick={(e) => handleDoubleClick(e, element)}
          >
            {element.content}
          </div>
        );
    }
  };

  return (
    <div
      id={element.id}
      style={{ ...element.styles }}
      onDrop={(e) => handleDrop(e, element)}
      onDragOver={(e) => e.preventDefault()}
      onContextMenu={(e) => handleContextMenu(e, element)}
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      className={` ${
        element.isSelected ? "border-black border-2 border-solid " : ""
      }`}
    >
      {(element as FrameElement).elements?.map((childElement) =>
        renderElement(childElement)
      )}
    </div>
  );
};

export default FrameComponents;
