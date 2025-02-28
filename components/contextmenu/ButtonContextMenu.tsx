// import React from "react";
// import { Button } from "../ui/button";
// import { Input } from "../ui/input";
// import { useEditorContextProvider } from "@/lib/context";
// // import OnClick from "./popover/OnClick";
// // import OnHover from "./popover/OnHover";

// const Events = [
//   // { type: "Click", label: <OnClick /> },
//   // { type: "Hover", label: <OnHover /> },
// ];
// type Props = {
//   x: number;
//   y: number;
// }

// const ButtonContextMenu = ({x, y}: Props) => {
//   const [search, setSearch] = React.useState("");

//   return (
//     <div
//       className="z-50 relative min-w-[150px] hover:cursor-pointer border border-gray-300 bg-primary p-2 rounded-lg gap-2 "
//       // style={{ top: y, left: x + 150 }}
//     >
//       <Input
//         onChange={(e) => setSearch(e.target.value)}
//         placeholder="Search event"
//         className="text-white"
//       />
//       {Events.filter((event) => event.type.includes(search)).map(
//         (event, index) => (
//           <li key={index}>{event.label}</li>
//         )
//       )}
//     </div>
//   );
// };

// export default ButtonContextMenu;
