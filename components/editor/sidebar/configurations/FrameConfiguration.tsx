import React from "react";
import FlexDirectionSelect from "./selects/FrameFlexDirectionSelect";
import AlignItemSelect from "./selects/FrameAlignItemSelect";
import JustifyContentSelect from "./selects/FrameJustifyContentSelect";
import FrameGapSelect from "./selects/FrameGapSelect";
import FrameFlexWrapSelect from "./selects/FrameFlexWrapSelect";
import FramePaddingControls from "./selects/FramePaddingControls";

import { EditorElement } from "@/lib/type";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Typography from "./accorditionitem/Typography";
import AppearanceAccordion from "./accorditionitem/AppearanceAccordion";

type Props = {
  selectedElement: EditorElement;
};

const FrameConfiguration: React.FC<Props> = ({ selectedElement }) => {
  return (
    <Accordion
      type="multiple"
      defaultValue={["layout", "spacing", "appearance"]}
      className="w-full"
    >
      <Typography selectedElement={selectedElement} />
      <AppearanceAccordion selectedElement={selectedElement} />
      <AccordionItem value="layout">
        <AccordionTrigger className="text-sm font-medium">
          Layout
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <div className="flex flex-row gap-2 flex-wrap">
              <FlexDirectionSelect selectedElement={selectedElement} />
              <FrameFlexWrapSelect selectedElement={selectedElement} />
            </div>
            <div className="flex flex-row gap-2 flex-wrap">
              <AlignItemSelect selectedElement={selectedElement} />
              <JustifyContentSelect selectedElement={selectedElement} />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="spacing">
        <AccordionTrigger className="text-sm font-medium">
          Spacing
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4 p-1">
            <FrameGapSelect selectedElement={selectedElement} />
            <FramePaddingControls selectedElement={selectedElement} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FrameConfiguration;
