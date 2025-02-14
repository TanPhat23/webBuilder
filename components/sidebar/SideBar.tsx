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
import ExportButton from "./ExportToCode";
import { useEditorContext } from "@/lib/context";
import ListItemHolder from "../sidebarcomponentholders/ListItemHolder";

type Component = {
  component: React.ReactNode;
  label?: string;
};

const SideBar = () => {
  const { elements } = useEditorContext();
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
  ];

  return (
    <Accordion
      type="multiple"
      className="w-auto h-screen bg-gray-100 z-50"
      id="sidebar"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <PlusIcon />
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="grid grid-cols-2 transition ease-linear duration-1000">
            {placeHolderComponents.map((component, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y border-black border-2 h-[75px] w-[75px] m-2 rounded-lg text-center"
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
      <AccordionItem value="item-3">
        <AccordionTrigger>
          <Image />
        </AccordionTrigger>
        <AccordionContent
          className="border border-black p-1 rounded-lg transition-all duration-300 absolute w-[500px] h-[600px] bg-slate-50 overflow-scroll"
          style={{
            top: 14,
            left: 30,
          }}
        >
          <ImageUpload />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          <Settings />
        </AccordionTrigger>
        <AccordionContent
          className="border border-black p-1 rounded-lg transition-all duration-300 absolute w-[500px] h-[600px] bg-slate-50 overflow-scroll"
          style={{
            top: 14,
            left: 30,
          }}
        >
          <Configuration />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <ExportButton elements={elements} />
      </AccordionItem>
    </Accordion>
  );
};

export default SideBar;
