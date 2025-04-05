import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { useEditorContextProvider } from "@/lib/context";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import React, { startTransition, useEffect } from "react";

type Props = {};
const LinkDropDownMenu: React.FC<Props> = (props) => {
  const { updateElementOptimistically } = useOptimisticElement();
  const { selectedElement } = useEditorContextProvider();
  const [link, setLink] = React.useState(selectedElement?.href || "");

  useEffect(() => {
    if (selectedElement?.href) {
      startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          href: link,
        });
      });
    }
  }, [link]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white items-center flex w-full justify-center hover:bg-blue-400 hover:rounded-lg h-8 text-sm">
        {selectedElement?.href ? "Edit Link" : "Add Link"}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={10} className="text-white">
        <Input
          className="bg-black"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setLink(e.target.value)}
          value={link}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkDropDownMenu;
