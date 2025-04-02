import React from "react";
import FlexDirectionSelect from "./selects/FrameFlexDirectionSelect";
import AlignItemSelect from "./selects/FrameAlignItemSelect";
import JustifyContentSelect from "./selects/FrameJustifyContentSelect";
import { EditorElement } from "@/lib/type";

type Props = {
  selectedElement: EditorElement;
};

const FrameConfiguration: React.FC<Props> = ({ selectedElement }) => {
  return (
    <>
      <div className="flex flex-row gap-1 flex-wrap mr-4">
        <FlexDirectionSelect selectedElement={selectedElement} />
        <AlignItemSelect selectedElement={selectedElement} />
        <JustifyContentSelect selectedElement={selectedElement} />
      </div>
    </>
  );
};

export default FrameConfiguration;
