"use client";
import React from "react";
import jsonData from "@/test.json";
import { EditorElement, ElementTypes, FrameElement } from "@/lib/type";
import useSWR from "swr";
import { GetAll } from "../../api/element/route";

function PreviewPage() {
  const {
    data: elements,
    error,
    isLoading,
  } = useSWR<EditorElement[]>(
    process.env.NEXT_PUBLIC_API_URL + "/elements",
    GetAll
  );
  if (error) console.log(error);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

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
      {elements?.map((element: EditorElement) => {
        switch (element.type as ElementTypes) {
          case "Frame":
            return renderFrameElement(element as FrameElement);
        }
      })}
    </div>
  );
}

export default PreviewPage;
