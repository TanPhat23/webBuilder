import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  FrameElement,
  CarouselElement,
  FormElement,
  ListElement,
} from "@/lib/interface";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { EditorElement } from "@/lib/type";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Type,
  Link as LinkIcon,
  Square,
  MousePointer,
  Image,
  Frame,
  List as ListIcon,
  FormInput,
  LayoutGrid,
  BarChart2,
  Table2,
  Files,
  Images,
} from "lucide-react";
import React, { startTransition, useState } from "react";

const LayoutSideBarElements = () => {
  const { elements, updateElementOptimistically, updateElement } =
    useEditorStore();

  const { setSelectedElement } = useElementSelectionStore();

  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const getElementIcon = (type: string) => {
    switch (type) {
      case "Text":
        return <Type className="h-4 w-4 mr-2" />;
      case "Link":
        return <LinkIcon className="h-4 w-4 mr-2" />;
      case "Button":
        return <MousePointer className="h-4 w-4 mr-2" />;
      case "Image":
        return <Image className="h-4 w-4 mr-2" />;
      case "Frame":
        return <Frame className="h-4 w-4 mr-2" />;
      case "List":
        return <ListIcon className="h-4 w-4 mr-2" />;
      case "ListItem":
        return <Square className="h-4 w-4 mr-2" />;
      case "Carousel":
        return <Images className="h-4 w-4 mr-2" />;
      case "Input":
        return <FormInput className="h-4 w-4 mr-2" />;
      case "Select":
        return <LayoutGrid className="h-4 w-4 mr-2" />;
      case "Chart":
        return <BarChart2 className="h-4 w-4 mr-2" />;
      case "DataTable":
        return <Table2 className="h-4 w-4 mr-2" />;
      case "Form":
        return <Files className="h-4 w-4 mr-2" />;
      default:
        return <Square className="h-4 w-4 mr-2" />;
    }
  };

  const renderElement = (element: EditorElement, level: number = 0) => {
    const isContainer = ["Frame", "Carousel", "Form", "List"].includes(
      element.type
    );

    let nestedElements: EditorElement[] = [];
    if (element.type === "Frame") {
      nestedElements = (element as FrameElement).elements || [];
    } else if (element.type === "Carousel") {
      nestedElements = (element as CarouselElement).elements || [];
    } else if (element.type === "Form") {
      nestedElements = (element as FormElement).elements || [];
    } else if (element.type === "List") {
      nestedElements = (element as ListElement).elements || [];
    }

    const displayName = element.name || element.content || element.type;
    const handleInputChange = (e: React.FocusEvent<HTMLSpanElement>) => {
      const newName = e.currentTarget.innerText.trim();
      if (!newName || newName === displayName) return;

      startTransition(() => {
        updateElementOptimistically(element.id, {
          ...element,
          name: newName,
        });
      });
    };

    const handleDoubleClick = (
      e: React.MouseEvent<HTMLDivElement>,
      element: EditorElement
    ) => {
      e.stopPropagation();
      updateElement(element.id, {
        ...element,
        isSelected: !element.isSelected,
      });
      setSelectedElement(element);
    };

    const handleToggle = (open: boolean) => {
      setOpenItems((prev) => ({
        ...prev,
        [element.id]: open,
      }));
    };

    const isOpen = openItems[element.id] || false;

    return (
      <div key={element.id} className="w-full">
        <Collapsible
          className="group/collapsible"
          open={isOpen}
          onOpenChange={(open) => handleToggle(open)}
        >
          <div
            className={`flex flex-row w-full justify-between p-2 cursor-pointer`}
            onClick={() => isContainer && handleToggle(!isOpen)}
          >
            <div
              className={cn(
                "flex items-center flex-grow text-xs hover:bg-accent hover:rounded-md p-1",
                {
                  "bg-accent rounded-md": element.isSelected,
                }
              )}
              onDoubleClick={(e) => handleDoubleClick(e, element)}
            >
              {getElementIcon(element.type)}
              <span
                suppressContentEditableWarning
                contentEditable
                onBlur={handleInputChange}
                onClick={(e) => e.stopPropagation()}
                className="text-xs"
              >
                {displayName}
              </span>
            </div>
            {isContainer && nestedElements.length > 0 && (
              <CollapsibleTrigger asChild>
                <button
                  className="flex items-center justify-center h-6 w-6 rounded-full hover:bg-gray-200 transition-colors focus:outline-none "
                  onClick={(e) => e.stopPropagation()}
                >
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-300 ease-in-out ${
                      isOpen ? "rotate-180 text-primary" : "text-gray-500"
                    }`}
                  />
                </button>
              </CollapsibleTrigger>
            )}
          </div>
          {isContainer && nestedElements.length > 0 && (
            <CollapsibleContent>
              <div className="pl-4">
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
