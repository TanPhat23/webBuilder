import { EditorElement } from "@/lib/type";
import { InputElement } from "@/lib/interface";
import React, { startTransition, useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useEditorStore } from "@/lib/store/editorStore";

type Props = {
  selectedElement: EditorElement;
};

const InputConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();
  const inputElement = selectedElement as InputElement;
  const inputSettings = inputElement.inputSettings || {};

  const updateInputSettings = (settings: Partial<HTMLInputElement>) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        inputSettings: {
          ...inputElement.inputSettings,
          ...settings,
        },
      });
    });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["basic", "validation", "appearance"]}
      className="w-full"
    >
      <AccordionItem value="basic">
        <AccordionTrigger className="text-sm font-medium">
          Basic Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Input Type */}
            <div className="space-y-2">
              <Label htmlFor="input-type">Input Type</Label>
              <Select
                value={inputSettings.type || "text"}
                onValueChange={(value) => updateInputSettings({ type: value })}
              >
                <SelectTrigger id="input-type">
                  <SelectValue placeholder="Select input type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="password">Password</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="tel">Telephone</SelectItem>
                  <SelectItem value="url">URL</SelectItem>
                  <SelectItem value="search">Search</SelectItem>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="time">Time</SelectItem>
                  <SelectItem value="datetime-local">Date & Time</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Placeholder */}
            <div className="space-y-2">
              <Label htmlFor="placeholder">Placeholder</Label>
              <Input
                id="placeholder"
                value={inputSettings.placeholder || ""}
                onChange={(e) =>
                  updateInputSettings({ placeholder: e.target.value })
                }
                placeholder="Enter placeholder text"
              />
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={inputSettings.name || ""}
                onChange={(e) => updateInputSettings({ name: e.target.value })}
                placeholder="Input field name"
              />
            </div>

            {/* Default Value */}
            <div className="space-y-2">
              <Label htmlFor="value">Default Value</Label>
              <Input
                id="value"
                value={inputSettings.value || ""}
                onChange={(e) => updateInputSettings({ value: e.target.value })}
                placeholder="Default value"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="validation">
        <AccordionTrigger className="text-sm font-medium">
          Validation
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Required */}
            <div className="flex items-center justify-between">
              <Label htmlFor="required" className="flex-grow">
                Required
              </Label>
              <Switch
                id="required"
                checked={inputSettings.required || false}
                onCheckedChange={(checked) =>
                  updateInputSettings({ required: checked })
                }
              />
            </div>

            {/* Min Length (for text inputs) */}
            {(inputSettings.type === "text" ||
              inputSettings.type === "password" ||
              inputSettings.type === "email") && (
              <div className="space-y-2">
                <Label htmlFor="minlength">Min Length</Label>
                <Input
                  id="minlength"
                  type="number"
                  value={inputSettings.minLength || ""}
                  onChange={(e) =>
                    updateInputSettings({
                      minLength: Number(e.target.value) || undefined,
                    })
                  }
                  placeholder="Minimum length"
                />
              </div>
            )}

            {/* Max Length (for text inputs) */}
            {(inputSettings.type === "text" ||
              inputSettings.type === "password" ||
              inputSettings.type === "email") && (
              <div className="space-y-2">
                <Label htmlFor="maxlength">Max Length</Label>
                <Input
                  id="maxlength"
                  type="number"
                  value={inputSettings.maxLength || ""}
                  onChange={(e) =>
                    updateInputSettings({
                      maxLength: Number(e.target.value) || undefined,
                    })
                  }
                  placeholder="Maximum length"
                />
              </div>
            )}

            {/* Pattern */}
            {(inputSettings.type === "text" ||
              inputSettings.type === "tel") && (
              <div className="space-y-2">
                <Label htmlFor="pattern">Pattern (RegEx)</Label>
                <Input
                  id="pattern"
                  value={inputSettings.pattern || ""}
                  onChange={(e) =>
                    updateInputSettings({ pattern: e.target.value })
                  }
                  placeholder="Regular expression pattern"
                />
              </div>
            )}

            {/* Min and Max for number inputs */}
            {inputSettings.type === "number" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="min">Minimum Value</Label>
                  <Input
                    id="min"
                    type="number"
                    value={inputSettings.min || ""}
                    onChange={(e) =>
                      updateInputSettings({ min: e.target.value })
                    }
                    placeholder="Minimum value"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max">Maximum Value</Label>
                  <Input
                    id="max"
                    type="number"
                    value={inputSettings.max || ""}
                    onChange={(e) =>
                      updateInputSettings({ max: e.target.value })
                    }
                    placeholder="Maximum value"
                  />
                </div>
              </>
            )}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger className="text-sm font-medium">
          Appearance
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Size */}
            <div className="space-y-2">
              <Label htmlFor="size">Size</Label>
              <Select
                value={
                  inputSettings.size !== undefined
                    ? String(inputSettings.size)
                    : "default"
                }
                onValueChange={(value) =>
                  updateInputSettings({ size: parseInt(value) })
                }
              >
                <SelectTrigger id="size">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">Default</SelectItem>
                  <SelectItem value="sm">Small</SelectItem>
                  <SelectItem value="lg">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Disabled */}
            <div className="flex items-center justify-between">
              <Label htmlFor="disabled" className="flex-grow">
                Disabled
              </Label>
              <Switch
                id="disabled"
                checked={inputSettings.disabled || false}
                onCheckedChange={(checked) =>
                  updateInputSettings({ disabled: checked })
                }
              />
            </div>

            {/* Read Only */}
            <div className="flex items-center justify-between">
              <Label htmlFor="readonly" className="flex-grow">
                Read Only
              </Label>
              <Switch
                id="readonly"
                checked={inputSettings.readOnly || false}
                onCheckedChange={(checked) =>
                  updateInputSettings({ readOnly: checked })
                }
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InputConfiguration;
