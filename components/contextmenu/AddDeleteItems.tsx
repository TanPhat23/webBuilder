import React, { useCallback } from "react";
import { Button } from "../ui/button";
import { useEditorContextProvider } from "@/lib/context";
import { ListElement, ListItem } from "@/lib/type";
import { v4 as uuidv4 } from "uuid";
import { listItemStyles } from "@/app/utils/CreateElements";

type Props = {};

const AddDeleteItems = (props: Props) => {
  const { selectedElement, x, y, onClose } = useEditorContextProvider();
  const [deleteItem, setDeleteItem] = React.useState(false);
  const handleAddItem = React.useCallback(() => {
    (selectedElement as ListElement).items.push({
      id: `Item-${uuidv4()}`,
      content: `Item ${(selectedElement as ListElement).items.length + 1} `,
      isSelected: false,
      styles: {
        ...listItemStyles,
      },
    });
    onClose();
  }, [selectedElement]);

  const handleDeleteItem = React.useCallback(
    (item: ListItem) => {
      (selectedElement as ListElement).items = (
        selectedElement as ListElement
      ).items.filter((i) => i.id !== item.id);
      onClose();
    },
    [selectedElement]
  );
  return (
    <>
      <Button
        onClick={() => handleAddItem()}
        className="flex items-center hover:bg-blue-400 w-full"
      >
        Add Item
      </Button>
      <Button
        className="flex items-center hover:bg-blue-400 w-full"
        onClick={() => setDeleteItem(true)}
      >
        Delete Item
      </Button>
      {deleteItem && (
        <div
          className={`z-50 min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2 top-[${y}] left-[${x}] absolute`}
        >
          {(selectedElement as ListElement).items.map((item, index) => (
            <Button
              key={index}
              onClick={() => handleDeleteItem(item)}
              className="hover:bg-blue-400 w-full"
            >
              {item.content}
            </Button>
          ))}
        </div>
      )}
    </>
  );
};

export default AddDeleteItems;
