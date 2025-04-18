import { EditorElement, ElementTypes } from "@/lib/type";
import { FrameElement } from "@/lib/interface";
import React from "react";
import { GetAllPublic } from "@/app/api/element/route";
export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const elements = await GetAllPublic(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/public/${slug}`
  );

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
            default:
              return null;
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
          default:
            return null;
        }
      })}
    </div>
  );
}
