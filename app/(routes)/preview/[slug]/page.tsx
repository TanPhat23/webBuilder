"use client";
import React from "react";
import { EditorElement, ElementTypes, FrameElement } from "@/lib/type";
import useSWR from "swr";
import { useParams } from "next/navigation";
import { GetAll } from "@/app/api/element/route";

function PreviewPage() {
  const params = useParams();
  const {
    data: elements,
    error,
    isLoading,
  } = useSWR<EditorElement[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${params.slug}`,
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
            case "A":
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
