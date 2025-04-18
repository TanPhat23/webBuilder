import { EditorElement } from "@/lib/type";
import { SelectElement } from "@/lib/interface";
import React, { startTransition } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "@/lib/store/editorStore";
import { PlusIcon, TrashIcon } from "lucide-react";

type Props = {
  selectedElement: EditorElement;
};

const SelectConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();
  const selectElement = selectedElement as SelectElement;
  const options = selectElement.options || [];
  const selectSettings = selectElement.selectSettings || {};

  const updateSelectSettings = (
    settings: Partial<{
      options: Array<Partial<HTMLOptionElement>>;
      selectSettings: Partial<HTMLSelectElement>;
    }>
  ) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        ...settings,
      });
    });
  };

  const addOption = () => {
    const newOptions = [
      ...options,
      {
        value: `option-${options.length + 1}`,
        text: `Option ${options.length + 1}`,
      },
    ];
    updateSelectSettings({ options: newOptions });
  };

  const updateOption = (index: number, field: string, value: string) => {
    const newOptions = [...options];
    newOptions[index] = {
      ...newOptions[index],
      [field]: value,
    };
    updateSelectSettings({ options: newOptions });
  };

  const removeOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    updateSelectSettings({ options: newOptions });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["options", "appearance"]}
      className="w-full"
    >
      <AccordionItem value="options">
        <AccordionTrigger className="text-sm font-medium">
          Select Options
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {options.map((option, index) => (
              <div
                key={index}
                className="flex flex-col space-y-2 border p-3 rounded-md"
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium">Option {index + 1}</h4>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeOption(index)}
                    className="h-6 w-6"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`option-value-${index}`}>Value</Label>
                  <Input
                    id={`option-value-${index}`}
                    value={option.value || ""}
                    onChange={(e) =>
                      updateOption(index, "value", e.target.value)
                    }
                    placeholder="Option value"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`option-text-${index}`}>Text</Label>
                  <Input
                    id={`option-text-${index}`}
                    value={option.text || ""}
                    onChange={(e) =>
                      updateOption(index, "text", e.target.value)
                    }
                    placeholder="Option text"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={`option-selected-${index}`}
                    className="flex-grow"
                  >
                    Selected by Default
                  </Label>
                  <Switch
                    id={`option-selected-${index}`}
                    checked={option.selected || false}
                    onCheckedChange={(checked) =>
                      updateOption(index, "selected", String(checked))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label
                    htmlFor={`option-disabled-${index}`}
                    className="flex-grow"
                  >
                    Disabled
                  </Label>
                  <Switch
                    id={`option-disabled-${index}`}
                    checked={option.disabled || false}
                    onCheckedChange={(checked) =>
                      updateOption(index, "disabled", String(checked))
                    }
                  />
                </div>
              </div>
            ))}

            <Button variant="outline" onClick={addOption} className="w-full">
              <PlusIcon className="h-4 w-4 mr-2" />
              Add Option
            </Button>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger className="text-sm font-medium">
          Appearance
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="multiple" className="flex-grow">
                Multiple Selection
              </Label>
              <Switch
                id="multiple"
                checked={selectSettings.multiple || false}
                onCheckedChange={(checked) => {
                  updateSelectSettings({
                    selectSettings: {
                      ...selectSettings,
                      multiple: checked,
                    },
                  });
                }}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="disabled" className="flex-grow">
                Disabled
              </Label>
              <Switch
                id="disabled"
                checked={selectSettings.disabled || false}
                onCheckedChange={(checked) => {
                  updateSelectSettings({
                    selectSettings: {
                      ...selectSettings,
                      disabled: checked,
                    },
                  });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Input
                id="size"
                type="number"
                min={1}
                value={selectSettings.size || 1}
                onChange={(e) => {
                  const size = Math.max(1, parseInt(e.target.value) || 1);
                  updateSelectSettings({
                    selectSettings: {
                      ...selectSettings,
                      size: size,
                    },
                  });
                }}
                placeholder="Visible options"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SelectConfiguration;
