import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React, { useState } from "react";

import { Image, PlusIcon, Settings } from "lucide-react";
import TextHolder from "../editorcomponents/TextHolder";
import LinkHolder from "../editorcomponents/LinkHolder";
import ImageUpload from "./ImageUpload";
import Configuration from "./Configuration";

type Component = {
  component: React.ReactNode;
  label?: string;
};

const SideBar = () => {
  const placeHolderComponents: Component[] = [
    {
      component: <TextHolder />,
      label: "Text",
    },
    {
      component: <LinkHolder />,
      label: "Link",
    },
    // {
    //   component: <ImageHolder />,
    //   label: "Image",
    // },
  ];

  return (
    <Accordion type="multiple" className="w-auto h-screen bg-gray-100 z-50" >
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
      <AccordionItem value="item-2">
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
      <AccordionItem value="item-3">
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
          <Configuration/>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SideBar;
