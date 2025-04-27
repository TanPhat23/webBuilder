import React, { startTransition } from "react";
import { EditorElement } from "@/lib/type";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEditorStore } from "@/lib/store/editorStore";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import FrameFlexDirectionSelect from "./selects/FrameFlexDirectionSelect";
import FrameAlignItemSelect from "./selects/FrameAlignItemSelect";
import FrameJustifyContentSelect from "./selects/FrameJustifyContentSelect";
import FrameGapSelect from "./selects/FrameGapSelect";
import FrameFlexWrapSelect from "./selects/FrameFlexWrapSelect";
import FramePaddingControls from "./selects/FramePaddingControls";

type Props = {
  selectedElement: EditorElement | undefined;
};

const ListItemConfiguration = ({ selectedElement }: Props) => {
  const { updateElementOptimistically } = useEditorStore();

  const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selectedElement) return;
    
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        content: e.target.value,
      });
    });
  };

  if (!selectedElement || selectedElement.type !== "ListItem") return null;

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">List Item Settings</h3>
      
      <div className="space-y-4">
        <div>
          <Label>Content</Label>
          <Input 
            value={selectedElement.content || ""} 
            onChange={handleContentChange}
            placeholder="List item content"
          />
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="layout">
            <AccordionTrigger>Layout</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <Label>Flex Direction</Label>
                <FrameFlexDirectionSelect selectedElement={selectedElement} />
                
                <Label>Align Items</Label>
                <FrameAlignItemSelect selectedElement={selectedElement} />
                
                <Label>Justify Content</Label>
                <FrameJustifyContentSelect selectedElement={selectedElement} />
                
                <FrameGapSelect selectedElement={selectedElement} />
                
                <Label>Flex Wrap</Label>
                <FrameFlexWrapSelect selectedElement={selectedElement} />
                
                <FramePaddingControls selectedElement={selectedElement} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ListItemConfiguration;
