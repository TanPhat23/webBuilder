import createElements from "@/app/utils/CreateFrameElements";
import { useEditorContext } from "@/lib/context";
import { EditorElement, FrameElement, ListElement } from "@/lib/type";
import React from "react";

type Props = {
  element: EditorElement;
};

const FrameComponents = ({ element }: Props) => {
  const { dispatch } = useEditorContext();

  const handleDrop = React.useCallback(
    (e: React.DragEvent<HTMLDivElement>, element: EditorElement) => {
      e.preventDefault();
      e.stopPropagation();
      const elementType = e.dataTransfer.getData("elementType");

      const newElement: EditorElement = createElements(elementType);
      newElement.parentElements?.push(element.id);

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

  const renderElement = (element: EditorElement) => {
    switch (element.type) {
      case "Frame":
        return <FrameComponents key={element.id} element={element} />;
      case "Button":
        return (
          <div key={element.id} style={{ ...element.styles }}>
            {element.content}
          </div>
        );
      case "List":
        return (
          <div key={element.id} style={{ ...element.styles }}>
            {(element as ListElement).items?.map((item) => (
              <div key={item.id} style={{ ...item.styles }}>
                {item.content}
              </div>
            ))}
          </div>
        );
      default:
        return (
          <div key={element.id} style={{ ...element.styles }}>
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
    >
      {(element as FrameElement).elements?.map((childElement) =>
        renderElement(childElement)
      )}
    </div>
  );
};

export default FrameComponents;
