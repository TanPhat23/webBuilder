import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SidebarGroup } from "@/components/ui/sidebar";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { FrameElement, EditorElement } from "@/lib/type";
import { ChevronDown } from "lucide-react";
import React from "react";

type Props = {};

const LayoutSideBarElements = (props: Props) => {
  const { elements, dispatch } = useEditorContext();
  const { setSelectedElement } = useEditorContextProvider();
  const handleDoubleClick = React.useCallback(
    (element: EditorElement) => {
      if (!element) return;
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: { isSelected: !element.isSelected },
        },
      });
      setSelectedElement(element);
    },
    [dispatch]
  );

  const handleMouseEnter = React.useCallback(
    (element: EditorElement) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: { isSelected: true },
        },
      });
    },
    [dispatch]
  );

  const handleMouseLeave = React.useCallback(
    (element: EditorElement) => {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: {
          id: element.id,
          updates: { isSelected: false },
        },
      });
    },
    [dispatch]
  );
  const renderElement = (element: EditorElement, level: number = 0) => {
    const isFrame = element.type === "Frame";
    const nestedElements = isFrame ? (element as FrameElement).elements : [];

    return (
      <div key={element.id} className="w-full">
        <Collapsible className="group/collapsible">
          <div
            className={`flex flex-row w-full justify-between hover:bg-gray-100 p-2 cursor-pointer ${
              element.isSelected ? "bg-blue-300 rounded-lg" : ""
            }`}
            // onMouseEnter={() => handleMouseEnter(element)}
            // onMouseLeave={() => handleMouseLeave(element)}
          >
            <div onDoubleClick={() => handleDoubleClick(element)}>
              {element.content}
            </div>
            <CollapsibleTrigger className="mx-3">
              {isFrame && (
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              )}
            </CollapsibleTrigger>
          </div>
          {isFrame && (
            <CollapsibleContent>
              <div className="pl-4">
                {" "}
                {nestedElements.map((child) => renderElement(child, level + 1))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-end mb-2"></div>
      {elements.map((element) => renderElement(element))}
    </div>
  );
};

export default LayoutSideBarElements;
