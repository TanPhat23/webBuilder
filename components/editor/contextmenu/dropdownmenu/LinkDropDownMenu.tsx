import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import React from "react";

type Props = {};
const LinkDropDownMenu: React.FC<Props> = (props) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-white items-center flex w-full justify-center hover:bg-blue-400 hover:rounded-lg h-8 text-sm">
        Add Link
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right" sideOffset={10} className="text-white">
        <Input className="bg-black" onClick={(e) => e.stopPropagation()} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkDropDownMenu;
