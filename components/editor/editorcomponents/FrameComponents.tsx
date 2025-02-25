import createElements from "@/app/utils/CreateFrameElements";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement, FrameElement, ListElement } from "@/lib/type";
import React from "react";

type Props = {
  element: EditorElement;
  setShowContextMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setMenuPosition: React.Dispatch<
    React.SetStateAction<{ x: number; y: number }>
  >;
};

const FrameComponents = ({
  element,
  setShowContextMenu,
  setMenuPosition,
}: Props) => {
  const { dispatch } = useEditorContext();
  const { setSelectedElement } = useEditorContextProvider();
  const rootElement = element as FrameElement;
  
  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      const elementType = e.dataTransfer.getData("elementType");

      const newElement: EditorElement = createElements(elementType);

      (element as FrameElement).elements?.push(newElement);
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: {
            elements: (element as FrameElement).elements,
          },
        },
      });
    },
    [dispatch]
  );

  const handleDoubleClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      if (!element.isSelected) setSelectedElement(element);
      dispatch({
        type: "UPDATE_FRAME_ELEMENT",
        payload: {
          parentElement: rootElement,
          childUpdates: element.id,
          updates: {
            isSelected: !element.isSelected,
          },
        },
      });
    },
    [dispatch]
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      e.stopPropagation();
    },
    [dispatch, element]
  );
  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      let newContent = e.currentTarget.innerHTML;

      if (newContent.includes("<br>")) {
        newContent = newContent.replace(/<br>/g, "");
      }

      dispatch({
        type: "UPDATE_FRAME_ELEMENT",
        payload: {
          childUpdates: element.id,
          parentElement: rootElement,
          updates: { content: newContent },
        },
      });
    },
    [dispatch]
  );

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
            onKeyDown={(e) => handleKeyDown(e)}
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
      case "List":
        return (
          <ul
            key={element.id}
            style={{ ...element.styles }}
            onDoubleClick={(e) => handleDoubleClick(e, element)}
            className={`scale-x-75 ${
              element.isSelected ? "border-black border-2 border-solid" : ""
            }`}
          >
            {(element as ListElement).items?.map((item) => (
              <li key={item.id} style={{ ...item.styles }}>
                {item.content}
              </li>
            ))}
          </ul>
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
