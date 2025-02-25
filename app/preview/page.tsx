import React from "react";
import jsonData from "@/test.json";
import { EditorElement, ElementTypes, FrameElement } from "@/lib/type";

function PreviewPage() {
  const elements: EditorElement[] = jsonData as EditorElement[];
  console.log(elements);

  const renderFrameElement = (element: FrameElement) => {
    return (
      <div
        key={element.id}
        style={{
          ...element.styles,
        }}
      >
        {element.elements.map((childElement) => {
          switch (childElement.type as ElementTypes) {
            case "Text":
              return (
                <p
                  key={childElement.id}
                  style={{
                    ...childElement.styles,
                  }}
                >
                  {childElement.content}
                </p>
              );
            case "Link":
              return (
                <a
                  key={childElement.id}
                  href={childElement.href}
                  style={{ ...childElement.styles }}
                >
                  {childElement.content}
                </a>
              );
            case "Button":
              return (
                <button
                  key={childElement.id}
                  style={{ ...childElement.styles }}
                >
                  {childElement.content}
                </button>
              );
            case "Frame":
              return renderFrameElement(childElement as FrameElement);
          }
        })}
      </div>
    );
  };

  return (
    <div className="w-screen h-screen">
      {elements.map((element) => {
        switch (element.type as ElementTypes) {
          case "Frame":
            return renderFrameElement(element as FrameElement);
        }
      })}
    </div>
  );
}

export default PreviewPage;
