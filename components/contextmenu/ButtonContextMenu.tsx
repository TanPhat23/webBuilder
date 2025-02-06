import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useEditorContextProvider } from "@/lib/context";
import OnClick from "./popover/OnClick";
import OnHover from "./popover/OnHover";

const Events = [
  { type: "Click", label: <OnClick /> },
  { type: "Hover", label: <OnHover /> },
];

const ButtonContextMenu = () => {
  const [search, setSearch] = React.useState("");
  const { x, y } = useEditorContextProvider();

  return (
    <div
      className="z-50 absolute min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2 "
      style={{ top: y, left: x + 150 }}
    >
      <Input
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search event"
        className="text-white"
      />
      {Events.filter((event) => event.type.includes(search)).map(
        (event, index) => (
          <li key={index}>{event.label}</li>
        )
      )}
    </div>
  );
};

export default ButtonContextMenu;
