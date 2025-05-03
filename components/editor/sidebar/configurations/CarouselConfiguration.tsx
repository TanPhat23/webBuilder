import { CarouselElement } from "@/lib/interface";
import React, { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import CarouselSwitch from "./switch/CarouselSwitch";
import CarouselNumberInput from "./inputs/CarouselNumberInput";
import CarouselTextInput from "./inputs/CarouselTextInput";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckIcon, CopyIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  selectedElement: CarouselElement;
};

const CarouselConfiguration: React.FC<Props> = () => {
  const router = useRouter();
  const { selectedElement } = useElementSelectionStore();
  const settings = (selectedElement as CarouselElement).carouselSettings || {};
  const { updateElementOptimistically } = useEditorStore();
  const [copied, setCopied] = useState(false);
  const [jsonValue, setJsonValue] = useState(JSON.stringify(settings, null, 2));
  const [isValidJson, setIsValidJson] = useState(true);

  useEffect(() => {
    setJsonValue(JSON.stringify(settings, null, 2));
  }, [settings]);

  const handleChange = <T,>(property: string, value: T) => {
    const updatedSettings = {
      ...settings,
      [property]: value,
    };

    if (typeof value === "boolean" && property === "autoplay") {
      updatedSettings.autoplay = Boolean(value);
    }

    if (selectedElement) {
      React.startTransition(() => {
        updateElementOptimistically(selectedElement.id, {
          carouselSettings: updatedSettings,
        });
        router.refresh();
      });
    }
  };

  const copySettingsToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(settings, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col">
      <Accordion type="single" collapsible>
        <AccordionItem value="basic">
          <AccordionTrigger>Basic Settings</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <CarouselNumberInput
              id="slidesToShow"
              label="Slides To Show"
              value={settings.slidesToShow || 1}
              onChange={(value) => handleChange("slidesToShow", value)}
            />

            <CarouselNumberInput
              id="slidesToScroll"
              label="Slides To Scroll"
              value={settings.slidesToScroll || 1}
              onChange={(value) => handleChange("slidesToScroll", value)}
            />

            <CarouselSwitch
              id="arrows"
              label="Show Arrows"
              checked={settings.arrows !== false}
              onCheckedChange={(checked) => handleChange("arrows", checked)}
            />

            <CarouselSwitch
              id="dots"
              label="Show Dots"
              checked={settings.dots !== false}
              onCheckedChange={(checked) => handleChange("dots", checked)}
            />

            <CarouselSwitch
              id="infinite"
              label="Infinite Looping"
              checked={settings.infinite !== false}
              onCheckedChange={(checked) => handleChange("infinite", checked)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="animation">
          <AccordionTrigger>Animation Settings</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <CarouselSwitch
              id="autoplay"
              label="Autoplay"
              checked={settings.autoplay == true}
              onCheckedChange={(checked) => handleChange("autoplay", checked)}
            />

            {settings.autoplay && (
              <CarouselNumberInput
                id="autoplaySpeed"
                label="Autoplay Speed (ms)"
                value={settings.autoplaySpeed || 3000}
                min={500}
                step={100}
                onChange={(value) => handleChange("autoplaySpeed", value)}
              />
            )}

            <CarouselNumberInput
              id="speed"
              label="Animation Speed (ms)"
              value={settings.speed || 500}
              min={100}
              step={50}
              onChange={(value) => handleChange("speed", value)}
            />

            <CarouselSwitch
              id="fade"
              label="Fade Effect"
              checked={settings.fade === true}
              onCheckedChange={(checked) => handleChange("fade", checked)}
            />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="advanced">
          <AccordionTrigger>Advanced Settings</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <CarouselSwitch
              id="centerMode"
              label="Center Mode"
              checked={settings.centerMode === true}
              onCheckedChange={(checked) => handleChange("centerMode", checked)}
            />

            {settings.centerMode && (
              <CarouselTextInput
                id="centerPadding"
                label="Center Padding"
                value={settings.centerPadding || "50px"}
                onChange={(value) => handleChange("centerPadding", value)}
              />
            )}

            <CarouselSwitch
              id="draggable"
              label="Draggable"
              checked={settings.draggable !== false}
              onCheckedChange={(checked) => handleChange("draggable", checked)}
            />

            <CarouselSwitch
              id="swipe"
              label="Touch Swipe"
              checked={settings.swipe !== false}
              onCheckedChange={(checked) => handleChange("swipe", checked)}
            />

            <CarouselSwitch
              id="vertical"
              label="Vertical Mode"
              checked={settings.vertical === true}
              onCheckedChange={(checked) => handleChange("vertical", checked)}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="custom">
          <AccordionTrigger>Custom Settings</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-3">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Edit JSON directly
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copySettingsToClipboard}
                  className="h-7 gap-1"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="h-3.5 w-3.5" />{" "}
                      <span className="text-green-500">Copied</span>
                    </>
                  ) : (
                    <>
                      <CopyIcon className="h-3.5 w-3.5" />
                    </>
                  )}
                </Button>
              </div>
              <Textarea
                className={cn("", {
                  "border-red-500": !isValidJson,
                })}
                value={jsonValue}
                onChange={(e) => {
                  setJsonValue(e.target.value);
                  try {
                    const parsed = JSON.parse(e.target.value);
                    setIsValidJson(true);
                    if (selectedElement) {
                      React.startTransition(() => {
                        updateElementOptimistically(selectedElement.id, {
                          carouselSettings: parsed,
                        });
                        router.refresh();
                      });
                    }
                  } catch (err) {
                    setIsValidJson(false);
                  }
                }}
              />
              <p className="text-xs text-muted-foreground">
                {isValidJson ? (
                  "Changes are applied when valid JSON is detected"
                ) : (
                  <span className="text-red-500">Invalid JSON format</span>
                )}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CarouselConfiguration;
