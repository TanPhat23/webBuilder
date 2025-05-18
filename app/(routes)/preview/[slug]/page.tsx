import { EditorElement, ElementTypes } from "@/lib/type";
import {
  ButtonElement,
  CarouselElement,
  FrameElement,
  InputElement,
  ListElement,
  SelectElement,
  FormElement,
} from "@/lib/interface";
import React from "react";
import { GetAllPublic } from "@/app/actions/element/action";
import { cn } from "@/lib/utils";
import DynamicCarousel from "@/components/preview/client/DynamicCarousel";

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

  let elements: EditorElement[] = [];
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
        className={element.tailwindStyles}
      >
        {element.elements.map((childElement) => renderElement(childElement))}
      </div>
    );
  };

  const renderListElement = (element: ListElement) => {
    return (
      <ul
        key={element.id}
        style={{
          ...element.styles,
        }}
        className={element.tailwindStyles}
      >
        {element.elements.map((childElement) => (
          <li key={childElement.id}>{renderElement(childElement)}</li>
        ))}
      </ul>
    );
  };

  const renderCarouselElement = (element: CarouselElement) => {
    const renderedChildren = element.elements.map((childElement) =>
      renderElement(childElement)
    );

    return (
      <DynamicCarousel
        key={element.id}
        settings={element.carouselSettings}
        style={element.styles}
      >
        {renderedChildren}
      </DynamicCarousel>
    );
  };

  const renderButtonElement = (element: ButtonElement) => {
    // If it's a multi-button with a dropdown
    if (element.buttonType === "multi" && element.element) {
      return (
        <div key={element.id} style={{ position: "relative" }}>
          <button
            style={{
              ...element.styles,
            }}
            className={element.tailwindStyles}
          >
            {element.content}
          </button>
        </div>
      );
    }

    // Standard button
    return (
      <button
        key={element.id}
        style={{
          ...element.styles,
        }}
        className={element.tailwindStyles}
      >
        {element.content}
      </button>
    );
  };

  const renderInputElement = (element: InputElement) => {
    const { inputSettings = {} } = element;

    return (
      <input
        key={element.id}
        type={inputSettings.type || "text"}
        placeholder={inputSettings.placeholder || ""}
        style={{
          ...element.styles,
        }}
        className={element.tailwindStyles}
        readOnly={inputSettings.readOnly}
        disabled={inputSettings.disabled}
      />
    );
  };

  const renderSelectElement = (element: SelectElement) => {
    const { options = [], selectSettings = {} } = element;

    return (
      <select
        key={element.id}
        style={{
          ...element.styles,
        }}
        className={element.tailwindStyles}
        multiple={selectSettings.multiple}
        disabled={selectSettings.disabled}
        size={selectSettings.size}
      >
        {options.map((option, index) => (
          <option
            key={`option-${index}`}
            value={option.value || ""}
            disabled={option.disabled}
            selected={option.selected}
          >
            {option.text || option.value || `Option ${index + 1}`}
          </option>
        ))}
      </select>
    );
  };

  const renderFormElement = (element: FormElement) => {
    return (
      <form
        key={element.id}
        style={{
          ...element.styles,
        }}
        className={element.tailwindStyles}
        method={element.formSettings?.method}
        autoComplete={element.formSettings?.autoComplete}
        noValidate={element.formSettings?.noValidate}
      >
        {element.elements.map((childElement) => renderElement(childElement))}
      </form>
    );
  };

  const renderElement = (element: EditorElement) => {
    switch (element.type as ElementTypes) {
      case "Text":
        return (
          <p
            key={element.id}
            style={{
              ...element.styles,
            }}
            className={element.tailwindStyles}
          >
            {element.content}
          </p>
        );
      case "Link":
        return (
          <a
            key={element.id}
            href={element.href}
            style={{ ...element.styles }}
            className={element.tailwindStyles}
          >
            {element.content}
          </a>
        );
      case "Image":
        return (
          <img
            key={element.id}
            src={element.src}
            alt={element.content || "Image"}
            style={{
              ...element.styles,
            }}
            className={cn(element.tailwindStyles, "object-cover ")}
            loading="lazy"
          />
        );
      case "Button":
        return renderButtonElement(element as ButtonElement);
      case "Frame":
        return renderFrameElement(element as FrameElement);
      case "Carousel":
        return renderCarouselElement(element as CarouselElement);
      case "ListItem":
        return renderListElement(element as ListElement);
      case "Input":
        return renderInputElement(element as InputElement);
      case "Select":
        return renderSelectElement(element as SelectElement);
      case "Form":
        return renderFormElement(element as FormElement);
      default:
        return null;
    }
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
    <div className="w-screen h-screen bg-white">
      {elements.map((element: EditorElement) => renderElement(element))}
    </div>
  );
}
