import createElements from "@/app/utils/CreateFrameElements";
import { useEditorContext } from "@/lib/context";
import { EditorElement, FrameElement, ListElement } from "@/lib/type";
import React from "react";

type Props = {
  element: EditorElement;
};

const FrameComponents = ({ element }: Props) => {
  const { dispatch } = useEditorContext();
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
      if (e.key === "End") {
        
      }
    },
    [dispatch, element]
  );

  const renderElement = (element: EditorElement) => {
    switch (element.type) {
      case "Frame":
        return <FrameComponents key={element.id} element={element} />;
      case "Button":
        return (
          <button key={element.id} style={{ ...element.styles }}>
            {element.content}
          </button>
        );
      case "List":
        return (
          <ul key={element.id} style={{ ...element.styles }}>
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
            className={
              element.isSelected ? "border-black border-2 border-solid" : ""
            }
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
      onDoubleClick={(e) => handleDoubleClick(e, element)}
      
      className={element.isSelected ? "border-black border-2 border-solid" : ""}
      onKeyDown={handleKeyDown}
    >
      {(element as FrameElement).elements?.map((childElement) =>
        renderElement(childElement)
      )}
    </div>
  );
};

export default FrameComponents;
