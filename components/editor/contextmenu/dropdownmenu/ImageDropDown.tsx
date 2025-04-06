import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

export default function ImageDropDown() {
  const { updateElement } = useEditorStore();
  const { selectedElement } = useElementSelectionStore();

  const handleImageUrlChange = (src: string) => {
    if (!selectedElement) return;
    updateElement(selectedElement.id, {
      src,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-full">Image</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="flex flex-col gap-2 items-start cursor-pointer w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium">Image URL</p>
            <input
              type="text"
              placeholder="Enter Image URL"
              className="w-full p-2 text-sm border rounded"
              value={(selectedElement as any)?.src || ""}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
