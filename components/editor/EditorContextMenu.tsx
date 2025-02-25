import { EditorElement, Element } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { ContextMenu } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu";
import React, { useCallback, useState } from "react";
import { useEditorContext } from "@/lib/context";
import ButtonContextMenu from "../contextmenu/ButtonContextMenu";
import { v4 as uuidv4 } from "uuid";

type Props = {
  x: number;
  y: number;
  selectedElement: Element | undefined;
  onClose: () => void;
};

const EditorContextMenu = ({ ...props }: Props) => {
  const [link, setLink] = useState("");
  const [addLink, setAddLink] = useState(false);
  const [addEvent, setAddEvent] = useState(false);
  const { onClose, x, y, selectedElement } = props;
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
      }
      onClose();
    },
    [selectedElement, dispatch, onClose]
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
    onClose();
  }, [elements]);

  const handlePaste = useCallback(() => {
    navigator.clipboard
      .readText()
      .then((text) => {
        try {
          const clipboardText: EditorElement = JSON.parse(text);
          const newElement = {
            type: clipboardText.type,
            id: `${clipboardText.type}-${uuidv4()}`,
            content: clipboardText.content,
            isSelected: false,
            x: clipboardText.x + 50,
            y: clipboardText.y + 50,
            styles: {
              ...clipboardText.styles,
            },
          };
          dispatch({
            type: "ADD_ELEMENT",
            payload: newElement,
          });
        } catch (err) {
          console.error("Failed to parse clipboard content:", err);
        }
        onClose();
      })
      .catch((err) => {
        console.error("Failed to read clipboard content:", err);
      });
  }, [dispatch]);

  return (
    <ContextMenu>
      <ContextMenuContent
        className="z-50 absolute min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2"
        style={{ top: y, left: x }}
        forceMount
      >
        {elementType?.includes("A") && (
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

      {addLink && (
        <Input
          id="link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          onBlur={handleSetLink}
          className="border border-gray-300 p-1 rounded-lg transition-all duration-300 text-white bg-primary absolute w-[200px]"
          placeholder="Enter URL"
          style={{
            top: y + 12,
            left: x + 160,
          }}
        />
      )}
      {addEvent && <ButtonContextMenu x={x} y={y} />}
    </ContextMenu>
  );
};

export default EditorContextMenu;
