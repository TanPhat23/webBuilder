import { EditorElement } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { ContextMenu, ContextMenuPortal } from "@/components/ui/context-menu";
import { ContextMenuContent } from "@radix-ui/react-context-menu";
import React, { startTransition, useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useEditorStore } from "@/lib/store/editorStore";
import LinkDropDownMenu from "./dropdownmenu/LinkDropDownMenu";
import ImageDropDown from "./dropdownmenu/ImageDropDown";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

type Props = {
  setOpen: (open: boolean) => void;
  contextMenuPosition: { x: number; y: number };
};

const EditorContextMenu: React.FC<Props> = ({
  setOpen,
  contextMenuPosition,
}) => {
  const [addEvent, setAddEvent] = useState(false);
  const { selectedElement } = useElementSelectionStore();
  const { elements, deleteElementOptimistically, addElementOptimistically } =
    useEditorStore();

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (selectedElement) {
        startTransition(() => {
          deleteElementOptimistically(selectedElement.id);
        });
      }
      setOpen(false);
    },
    [selectedElement, deleteElementOptimistically, setOpen]
  );

  const handleCopy = useCallback(() => {
    const selectedElement = elements.find((element) => element.isSelected);
    if (selectedElement) {
      const textToCopy = JSON.stringify(selectedElement);
      if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
          console.log("Element copied to clipboard:", selectedElement);
        });
      }
    }
  }, [elements]);

  const handlePaste = useCallback(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const clipboardText: EditorElement = JSON.parse(text);
          const newElement: EditorElement = {
            type: clipboardText.type,
            id: `${clipboardText.type}-${uuidv4()}`,
            content: clipboardText.content,
            isSelected: false,
            x: clipboardText.x + 50,
            y: clipboardText.y + 50,
            styles: {
              ...clipboardText.styles,
            },
            projectId: clipboardText.projectId,
          };

          // Use the optimistic add method from the store
          addElementOptimistically(newElement, clipboardText.projectId || "");
        } catch (err) {
          console.error("Failed to parse clipboard content:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard content:", err);
      });
  }, [addElementOptimistically]);

  const renderDropDownMenu = useCallback(() => {
    switch (selectedElement?.type) {
      case "Link":
        return <LinkDropDownMenu />;
      case "Image":
        return <ImageDropDown />;
      default:
        return null;
    }
  }, [selectedElement]);

  return (
    <ContextMenu onOpenChange={setOpen}>
      <ContextMenuPortal forceMount>
        <ContextMenuContent
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
          className={`min-w-32 hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2 z-50 absolute `}
        >
          {renderDropDownMenu()}
          <Button onClick={handleDelete} className="hover:bg-blue-400 w-full">
            Delete
          </Button>
          <Button onClick={handleCopy} className="hover:bg-blue-400 w-full">
            Copy
          </Button>
          <Button onClick={handlePaste} className="hover:bg-blue-400 w-full">
            Paste
          </Button>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default EditorContextMenu;
