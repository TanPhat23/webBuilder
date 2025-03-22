import { EditorElement, Element } from "@/lib/type";
import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuPortal,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu";
import React, { useCallback, useState } from "react";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { v4 as uuidv4 } from "uuid";
import { Delete } from "@/app/api/element/route";

type Props = {
  setOpen: (open: boolean) => void;
  contextMenuPosition: { x: number; y: number };
};

const EditorContextMenu: React.FC<Props> = ({
  setOpen,
  contextMenuPosition,
}) => {
  const [link, setLink] = useState("");
  const [addLink, setAddLink] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const { selectedElement } = useEditorContextProvider();

  const elementType = selectedElement?.type;

  const { elements, dispatch } = useEditorContext();

  const handleSetLink = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (addLink && selectedElement) {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: selectedElement.id,
            updates: {
              href: link,
            },
          },
        });
      }
      setAddLink(false);
    },
    [addLink, selectedElement, link, dispatch]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      if (selectedElement) {
        dispatch({ type: "DELETE_ELEMENT", payload: selectedElement.id });
        const tempElement = selectedElement;
        try {
          Delete(selectedElement.id);
        } catch (error) {
          console.error("Failed to delete element:", error);
          dispatch({ type: "ADD_ELEMENT", payload: tempElement });
        }
      }
      setOpen(false);  
    },
    [selectedElement, dispatch]
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
          dispatch({
            type: "ADD_ELEMENT",
            payload: newElement,
          });
        } catch (err) {
          console.error("Failed to parse clipboard content:", err);
        }
      })
      .catch((err) => {
        console.error("Failed to read clipboard content:", err);
      });
  }, [dispatch]);

  return (
    <ContextMenu onOpenChange={setOpen}>
      <ContextMenuPortal forceMount>
        <ContextMenuContent
          style={{
            top: contextMenuPosition.y,
            left: contextMenuPosition.x,
          }}
          className={`min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2 z-50 absolute `}
        >
          {elementType?.includes("Link") && (
            <ContextMenuItem>
              <Button
                onClick={(e) => {
                  setAddLink(true);
                  e.stopPropagation();
                }}
                className="hover:bg-blue-400 w-full text-start hover:rounded-lg"
              >
                {selectedElement?.href ? "Update Link" : "Add Link"}
              </Button>
            </ContextMenuItem>
          )}
          {elementType?.includes("Button") && (
            <ContextMenuItem>
              <Button
                onClick={(e) => {
                  setAddEvent(true);
                  e.stopPropagation();
                }}
                className="hover:bg-blue-400 w-full text-start hover:rounded-lg"
              >
                Add Event
              </Button>
            </ContextMenuItem>
          )}
          {elementType?.includes("List") && (
            <ContextMenuItem className="">
              {/* <AddDeleteItems /> */}
            </ContextMenuItem>
          )}
          <ContextMenuItem className="hover:rounded-lg">
            <Button onClick={handleDelete} className="hover:bg-blue-400 w-full">
              Delete
            </Button>
          </ContextMenuItem>
          <ContextMenuItem>
            <Button onClick={handleCopy} className="hover:bg-blue-400 w-full">
              Copy
            </Button>
          </ContextMenuItem>
          <ContextMenuItem>
            <Button onClick={handlePaste} className="hover:bg-blue-400 w-full">
              Paste
            </Button>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  );
};

export default EditorContextMenu;
