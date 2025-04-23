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

  let elements : EditorElement[] = [];
  try {
    const result = await GetAllPublic(
      `${process.env.NEXT_PUBLIC_API_URL}/elements/public/${slug}`
    );
    elements = Array.isArray(result) ? result : [];
  } catch (error) {
    console.error("Error fetching elements:", error);
  }

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

  if (elements.length === 0) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-2">No content found</h1>
          <p className="text-gray-500">
            This preview doesn&apos;t have any elements to display.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen">
      {elements.map((element: EditorElement) => {
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
