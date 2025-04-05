import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useOptimisticElement } from "@/hooks/useOptimisticElement";
import { useEditorContextProvider } from "@/lib/context";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import React, { startTransition } from "react";

type Props = {};
const ImageDropDown: React.FC<Props> = (props) => {
  const { selectedElement } = useEditorContextProvider();
  const { updateElementOptimistically } = useOptimisticElement();
  const [imageUrl, setImageUrl] = React.useState(selectedElement?.src || "");
  React.useEffect(() => {
    if (selectedElement?.src) {
      startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          src: imageUrl,
        });
      });
    }
  }, [imageUrl]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white items-center flex w-full justify-center hover:bg-blue-400 hover:rounded-lg h-8 text-sm">
        {selectedElement?.src ? "Change Image" : "Add Image"}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={10} className="text-white">
        <Input
          className="bg-black"
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ImageDropDown;
