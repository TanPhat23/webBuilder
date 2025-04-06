import { CarouselElement, EditorElement } from "@/lib/type";
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

const CarouselConfiguration: React.FC = () => {
  const { updateElement } = useEditorStore();
  const { selectedElement } = useElementSelectionStore();
  const element = selectedElement as CarouselElement;

  if (!element || element.type !== "Carousel") {
    return null;
  }

  const [dots, setDots] = useState(element.settings?.dots ?? true);
  const [infinite, setInfinite] = useState(element.settings?.infinite ?? true);
  const [autoplay, setAutoplay] = useState(element.settings?.autoplay ?? false);
  const [speed, setSpeed] = useState(element.settings?.speed ?? 500);
  const [autoplaySpeed, setAutoplaySpeed] = useState(
    element.settings?.autoplaySpeed ?? 3000
  );
  const [slidesToShow, setSlidesToShow] = useState(
    element.settings?.slidesToShow ?? 1
  );
  const [slidesToScroll, setSlidesToScroll] = useState(
    element.settings?.slidesToScroll ?? 1
  );

  const updateSettings = () => {
    updateElement(element.id, {
      settings: {
        dots,
        infinite,
        autoplay,
        speed,
        autoplaySpeed,
        slidesToShow,
        slidesToScroll,
      },
    });
  };

  return (
    <div className="flex flex-col space-y-4 p-4">
      <div className="flex justify-between items-center">
        <Label htmlFor="dots">Show Dots</Label>
        <Switch
          id="dots"
          checked={dots}
          onCheckedChange={(checked) => {
            setDots(checked);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                dots: checked,
              },
            });
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label htmlFor="infinite">Infinite Loop</Label>
        <Switch
          id="infinite"
          checked={infinite}
          onCheckedChange={(checked) => {
            setInfinite(checked);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                infinite: checked,
              },
            });
          }}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label htmlFor="autoplay">Autoplay</Label>
        <Switch
          id="autoplay"
          checked={autoplay}
          onCheckedChange={(checked) => {
            setAutoplay(checked);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                autoplay: checked,
              },
            });
          }}
        />
      </div>

      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <Label htmlFor="speed">Slide Speed (ms)</Label>
          <span className="text-xs">{speed}</span>
        </div>
        <Slider
          id="speed"
          min={100}
          max={1000}
          step={100}
          value={[speed]}
          onValueChange={(value) => {
            setSpeed(value[0]);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                speed: value[0],
              },
            });
          }}
        />
      </div>

      {autoplay && (
        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <Label htmlFor="autoplaySpeed">Autoplay Delay (ms)</Label>
            <span className="text-xs">{autoplaySpeed}</span>
          </div>
          <Slider
            id="autoplaySpeed"
            min={1000}
            max={10000}
            step={500}
            value={[autoplaySpeed]}
            onValueChange={(value) => {
              setAutoplaySpeed(value[0]);
              updateElement(element.id, {
                settings: {
                  ...element.settings,
                  autoplaySpeed: value[0],
                },
              });
            }}
          />
        </div>
      )}

      <div className="space-y-1">
        <Label htmlFor="slidesToShow">Slides to Show</Label>
        <Input
          id="slidesToShow"
          type="number"
          min={1}
          max={5}
          value={slidesToShow}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value)) return;
            setSlidesToShow(value);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                slidesToShow: value,
              },
            });
          }}
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="slidesToScroll">Slides to Scroll</Label>
        <Input
          id="slidesToScroll"
          type="number"
          min={1}
          max={5}
          value={slidesToScroll}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (isNaN(value)) return;
            setSlidesToScroll(value);
            updateElement(element.id, {
              settings: {
                ...element.settings,
                slidesToScroll: value,
              },
            });
          }}
        />
      </div>
    </div>
  );
};

export default CarouselConfiguration;
