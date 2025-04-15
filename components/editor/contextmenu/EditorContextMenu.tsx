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
  const { selectedElement, setSelectedElement } = useElementSelectionStore();
  const {
    deleteElementOptimistically,
    addElementOptimistically,
    updateElement,
  } = useEditorStore();

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Only proceed if there is a selected element
    if (selectedElement) {
      console.log("Delete element", selectedElement);

      startTransition(() => {
        deleteElementOptimistically(selectedElement.id);

        setSelectedElement(undefined);
      });
    }
    setOpen(false);
  };

  const handleCopy = useCallback(() => {
    // Use the selectedElement from the selection store rather than finding it again
    if (selectedElement) {
      const elementToSerialize = { ...selectedElement };
      
      window.sessionStorage.setItem(
        "editorClipboard",
        JSON.stringify(elementToSerialize)
      );

      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(JSON.stringify(elementToSerialize))
          .then(() => {
            console.log("Element copied to clipboard:", selectedElement);
          });
      }

      // Visual feedback for copy action
      const originalBorder = selectedElement.styles?.border;
      updateElement(selectedElement.id, {
        styles: {
          ...selectedElement.styles,
          border: "2px dashed green",
        },
      });

      setTimeout(() => {
        updateElement(selectedElement.id, {
          styles: {
            ...selectedElement.styles,
            border: originalBorder,
          },
        });
      }, 300);
    }

  }, [selectedElement, updateElement]);

  const handlePaste = useCallback(() => {
    try {
      const storedElement = window.sessionStorage.getItem("editorClipboard");
      if (storedElement) {
        const parsedElement = JSON.parse(storedElement);

        const newElement = {
          ...parsedElement,
          id: `${parsedElement.type}-${uuidv4()}`,
          x: parsedElement.x,
          y: parsedElement.y,
          isSelected: true, 
        };

        startTransition(() => {
          addElementOptimistically(newElement, parsedElement.projectId || "");
          setSelectedElement(newElement);
        });
      } else {
        navigator.clipboard
          .readText()
          .then((text) => {
            try {
              const clipboardText = JSON.parse(text);
              const newElement = {
                ...clipboardText,
                id: `${clipboardText.type}-${uuidv4()}`,
                x: clipboardText.x + 20,
                y: clipboardText.y + 20,
                isSelected: true,
              };

              startTransition(() => {
                addElementOptimistically(
                  newElement,
                  clipboardText.projectId || ""
                );
                setSelectedElement(newElement);
              });
            } catch (err) {
              console.error("Failed to parse clipboard content:", err);
            }
          })
          .catch((err) => {
            console.error("Failed to read clipboard content:", err);
          });
      }
    } catch (error) {
      console.error("Error pasting element:", error);
    }

    // Close the context menu after paste
    setOpen(false);
  }, [addElementOptimistically, setSelectedElement, setOpen]);

  const renderDropDownMenu = useCallback(() => {
    switch (selectedElement?.type) {
      case "Link":
        return <LinkDropDownMenu />;
      case "Image":
        return <ImageDropDown />;
      // case "Button":
      //   return <ButtonDropDown />;
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
