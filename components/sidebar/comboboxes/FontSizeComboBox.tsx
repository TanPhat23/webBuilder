import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { fontSize } from "@/lib/constants";
import { Element } from "@/lib/type";
import { useEditorContext } from "@/lib/context";

type Props = {
  selectedElement: Element | null;
  selectedElements: Element[];
};

const FontSizeComboBox = (props: Props) => {
  const { selectedElement, selectedElements } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<number | null>(null);

  const { elements, dispatch } = useEditorContext();

  useEffect(() => {
    if (selectedElement) {
      const fontSize = selectedElement.styles?.fontSize;
      setValue(typeof fontSize === "number" ? fontSize : null);
    }
  }, [selectedElement]);

  const handleSelect = (selectedSize: string) => {
    const size = parseInt(selectedSize, 10);
    setValue(size);

    if (selectedElement) {
      selectedElements.forEach((element) => {
        dispatch({
          type: "UPDATE_ELEMENT",
          payload: {
            id: element.id,
            updates: {
              styles: {
                ...element.styles,
                fontSize: size,
              },
            },
          },
        });
      });
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[170px]"
        >
          {value ? `${value}` : "0"}
          <ChevronsUpDown className="ml-4 h-4 mr-1 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[180px]">
        <Command>
          <CommandInput placeholder="Search font size..." />
          <CommandList>
            <CommandEmpty>No font size found.</CommandEmpty>
            <CommandGroup>
              {fontSize.map((size) => (
                <CommandItem
                  key={size}
                  value={size.toString()}
                  onSelect={() => {
                    handleSelect(size.toString());
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-0 h-4 w-4",
                      value === size ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {size}px
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FontSizeComboBox;
