import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React from "react";

import { Image, PlusIcon, Settings } from "lucide-react";
import TextHolder from "../sidebarcomponentholders/TextHolder";
import LinkHolder from "../sidebarcomponentholders/LinkHolder";
import ImageUpload from "./ImageUpload";
import Configuration from "./Configuration";
import ButtonHolder from "../sidebarcomponentholders/ButtonHolder";
import ListItemHolder from "../sidebarcomponentholders/ListItemHolder";
import FrameHolder from "../sidebarcomponentholders/FrameHolder";

type Component = {
  component: React.ReactNode;
  label?: string;
};

const SideBar = () => {
  const [canvasWH, setCanvasWH] = React.useState({ width: 0, height: 0 });
  React.useEffect(() => {
    const canvas = document.getElementById("canvas");
    if (canvas) {
      const rect = canvas?.getBoundingClientRect();
      setCanvasWH({ width: rect?.width, height: rect?.height });
      console.log(rect.width);
    }
  }, []);
  const placeHolderComponents: Component[] = [
    {
      component: <TextHolder />,
      label: "Text",
    },
    {
      component: <LinkHolder />,
      label: "Link",
    },
    {
      component: <ButtonHolder />,
      label: "Button",
    },
    {
      component: <ListItemHolder />,
      label: "ListItem",
    },
    {
      component: <FrameHolder />,
      label: "Frame",
    },
  ];

  return (
    <div className="flex h-screen">
      <Accordion
        type="multiple"
        className="w-auto h-full bg-gray-100 z-50 min-w-10 items-center"
        id="sidebar"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <PlusIcon />
          </AccordionTrigger>
          <AccordionContent
            className={`border border-black p-1 rounded-lg min-w-[200px] h-[600px] bg-slate-50 overflow-scroll absolute  `}
            style={{ left: canvasWH.width - 210 }}
          >
            <div className="grid grid-cols-2 transition ease-linear duration-1000">
              {placeHolderComponents.map((component, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center space-y border-black border-2 h-[75px] w-[75px] m-2 rounded-lg text-center text-sm"
                >
                  <div className="hover:cursor-pointer">
                    {component.component}
                  </div>
                  <div>{component.label}</div>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            <Image />
          </AccordionTrigger>
          <AccordionContent
            className="border border-black p-1 rounded-lg w-[400px] h-[600px] bg-slate-50 overflow-scroll absolute "
            style={{ left: canvasWH.width - 410 }}
          >
            <ImageUpload />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <Settings />
          </AccordionTrigger>
          <AccordionContent
            className={`border border-black p-1 rounded-lg w-[400px] h-[600px] bg-slate-50 overflow-scroll absolute `}
            style={{ left: canvasWH.width - 410 }}
          >
            <Configuration />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default SideBar;
