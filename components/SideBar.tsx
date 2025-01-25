import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import React from "react";

import { Image, Link, PlusIcon, TypeIcon } from "lucide-react";
import TextHolder from "./editorcomponents/TextHolder";
import LinkHolder from "./editorcomponents/LinkHolder";
import ImageHolder from "./editorcomponents/ImageHolder";
import { Element } from "@/lib/type";

type Component = {
  component: React.ReactNode;
  image?: React.ReactNode;
};


const SideBar = () => {
  const placeHolderComponents: Component[] = [
    {
      component: <TextHolder />,
      image: <TypeIcon />,
    },
    {
      component: <LinkHolder />,
      image: <Link />,
    },
    {
      component: <ImageHolder />,
      image: <Image />,
    },
  ];

  return (
    <Accordion type="multiple" className="w-auto h-screen bg-gray-100 z-50">
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
                <div>{component.image}</div>
                <div className="hover:cursor-pointer">
                  {component.component}
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SideBar;
