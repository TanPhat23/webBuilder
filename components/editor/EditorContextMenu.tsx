import { Element } from "@/lib/type";
import { Button } from "@/components/ui/button";
import { ContextMenu } from "@/components/ui/context-menu";
import { Input } from "@/components/ui/input";
import {
  ContextMenuContent,
  ContextMenuItem,
} from "@radix-ui/react-context-menu";
import React, { useCallback,  useState } from "react";
import { useEditorContext } from "@/lib/context";

type Props = {
  x: number;
  y: number;
  selectedElement: Element | undefined;
  onClose: () => void;
};

const EditorContextMenu = ({ onClose, ...props }: Props) => {
  const [link, setLink] = useState("");
  const [addLink, setAddLink] = useState(false);
  const { x, y, selectedElement } = props;
  const elementType = selectedElement?.type;

  const { dispatch } = useEditorContext();

  
  const handleSetLink = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (addLink && selectedElement) {
        let updatedContent = selectedElement.content;

        if (selectedElement.content.includes("</a>")) {
          updatedContent = selectedElement.content.replace(
            /<a[^>]*>([^<]*)<\/a>/,
            `<a href="${link}">$1</a>`
          );
        } else {
          updatedContent = `<a href="${link}">${selectedElement.content}</a>`;
        }

        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: selectedElement.id,
            updates: { content: updatedContent },
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

  return (
    <ContextMenu>
      <ContextMenuContent
        className="z-50 absolute min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2"
        style={{ top: y, left: x }}
        forceMount
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
              {selectedElement?.content.includes("</a>")
                ? "Update Link"
                : "Add Link"}
            </Button>
          </ContextMenuItem>
        )}
        <ContextMenuItem className="hover:rounded-lg">
          <Button onClick={handleDelete} className="hover:bg-blue-400 w-full">
            Delete
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
    </ContextMenu>
  );
};

export default EditorContextMenu;
