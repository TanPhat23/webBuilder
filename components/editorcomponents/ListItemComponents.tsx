import { useEditorContext } from "@/lib/context";
import { EditorElement, ListElement } from "@/lib/type";
import React from "react";

type Props = {
  element: EditorElement;
};

const ListItemComponents = ({ element }: Props) => {
  const { dispatch } = useEditorContext();
  const handleInput = React.useCallback(
    (e: React.FormEvent<HTMLElement>, id: string, itemId?: string) => {
      let newContent = e.currentTarget.innerHTML;

      if (newContent.includes("<br>")) {
        newContent = newContent.replace(/<br>/g, "");
      }

      if (itemId) {
        dispatch({
          type: "UPDATE_LIST_ITEM",
          payload: { listId: id, itemId, updates: { content: newContent } },
        });
      }
    },
    [dispatch]
  );
  return (element as ListElement).items?.map((item, index) => (
    <li
      key={item.id}
      contentEditable={element.isSelected}
      suppressContentEditableWarning={true}
      onBlur={(e) => handleInput(e, element.id, item.id)}
      style={{
        ...item.styles,
      }}
    >
      {item.content}
    </li>
  ));
};

export default ListItemComponents;
