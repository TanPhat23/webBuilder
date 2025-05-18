import { EditorElement } from "@/lib/type";
import { FormElement } from "@/lib/interface";
import React, { startTransition } from "react";
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
import AppearanceAccordion from "./accorditionitem/AppearanceAccordion";

type Props = {
  selectedElement: EditorElement;
};

const FormConfiguration: React.FC<Props> = ({ selectedElement }) => {
  const { updateElementOptimistically } = useEditorStore();
  const formElement = selectedElement as FormElement;
  const formSettings = formElement.formSettings || {};

  const updateFormSettings = (settings: Partial<HTMLFormElement>) => {
    if (!selectedElement) return;
    startTransition(() => {
      updateElementOptimistically(selectedElement.id, {
        formSettings: {
          ...formElement.formSettings,
          ...settings,
        },
      });
    });
  };

  return (
    <Accordion
      type="multiple"
      defaultValue={["basic", "advanced", "appearance"]}
      className="w-full"
    >
      <AppearanceAccordion selectedElement={selectedElement} />
      <AccordionItem value="basic">
        <AccordionTrigger className="text-sm font-medium">
          Basic Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Form Method */}
            <div className="space-y-2">
              <Label htmlFor="method">Form Method</Label>
              <Select
                value={formSettings.method || "post"}
                onValueChange={(value) => updateFormSettings({ method: value })}
              >
                <SelectTrigger id="method">
                  <SelectValue placeholder="Select form method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="post">POST</SelectItem>
                  <SelectItem value="get">GET</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Form Action */}
            <div className="space-y-2">
              <Label htmlFor="action">Form Action URL</Label>
              <Input
                id="action"
                value={formSettings.action || ""}
                onChange={(e) => updateFormSettings({ action: e.target.value })}
                placeholder="https://example.com/submit"
              />
            </div>

            {/* Form Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Form Name</Label>
              <Input
                id="name"
                value={formSettings.name || ""}
                onChange={(e) => updateFormSettings({ name: e.target.value })}
                placeholder="form-name"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="advanced">
        <AccordionTrigger className="text-sm font-medium">
          Advanced Settings
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Encoding Type */}
            <div className="space-y-2">
              <Label htmlFor="enctype">Encoding Type</Label>
              <Select
                value={
                  formSettings.encType || "application/x-www-form-urlencoded"
                }
                onValueChange={(value) =>
                  updateFormSettings({ encType: value })
                }
              >
                <SelectTrigger id="enctype">
                  <SelectValue placeholder="Select encoding type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="application/x-www-form-urlencoded">
                    application/x-www-form-urlencoded
                  </SelectItem>
                  <SelectItem value="multipart/form-data">
                    multipart/form-data
                  </SelectItem>
                  <SelectItem value="text/plain">text/plain</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Target */}
            <div className="space-y-2">
              <Label htmlFor="target">Form Target</Label>
              <Select
                value={formSettings.target || "_self"}
                onValueChange={(value) => updateFormSettings({ target: value })}
              >
                <SelectTrigger id="target">
                  <SelectValue placeholder="Select form target" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_self">Same Frame (_self)</SelectItem>
                  <SelectItem value="_blank">New Window (_blank)</SelectItem>
                  <SelectItem value="_parent">
                    Parent Frame (_parent)
                  </SelectItem>
                  <SelectItem value="_top">Full Window (_top)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Accept Charset */}
            <div className="space-y-2">
              <Label htmlFor="charset">Accept Charset</Label>
              <Input
                id="charset"
                value={formSettings.acceptCharset || ""}
                onChange={(e) =>
                  updateFormSettings({ acceptCharset: e.target.value })
                }
                placeholder="UTF-8"
              />
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="appearance">
        <AccordionTrigger className="text-sm font-medium">
          Behavior
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col space-y-4 py-2">
            {/* Auto Complete */}
            <div className="flex items-center justify-between">
              <Label htmlFor="autocomplete" className="grow">
                Auto Complete
              </Label>
              <Switch
                id="autocomplete"
                checked={formSettings.autoComplete !== "off"}
                onCheckedChange={(checked) =>
                  updateFormSettings({ autoComplete: checked ? "on" : "off" })
                }
              />
              <span className="text-xs text-muted-foreground ml-2 w-12">
                {formSettings.autoComplete !== "off" ? "On" : "Off"}
              </span>
            </div>

            {/* No Validate */}
            <div className="flex items-center justify-between">
              <Label htmlFor="novalidate" className="grow">
                Disable Validation
              </Label>
              <Switch
                id="novalidate"
                checked={formSettings.noValidate === true}
                onCheckedChange={(checked) =>
                  updateFormSettings({ noValidate: checked })
                }
              />
              <span className="text-xs text-muted-foreground ml-2 w-12">
                {formSettings.noValidate === true ? "Yes" : "No"}
              </span>
            </div>

            {/* Add Default Submit Button */}
            <div className="pt-2">
              <p className="text-xs text-muted-foreground mb-1">
                A default submit button will be added automatically if no submit
                button is present in the form.
              </p>
              <p className="text-xs text-muted-foreground">
                To create a custom submit button, add a Button and set its type
                to &quot;submit&quot; in the Button Configuration.
              </p>
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FormConfiguration;
