import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Presets from "@/lib/constants/presets";
import { CanvasStyles, useCanvasStore } from "@/lib/store/canvasStore";

const PresetsSelector = () => {
  const { setStyles } = useCanvasStore();
  const handlePresetClick = (preset: CanvasStyles) => {
    setStyles(preset);
  };
  return (
    <div className="grid grid-cols-2 gap-2">
      {Presets.map((preset, index) => (
        <Card
          onClick={() => handlePresetClick(preset.styles)}
          key={index}
          className="cursor-pointer hover:opacity-80 transition-opacity"
        >
          <CardContent
            style={{ ...preset.styles, width: "100%", height: "92px" }}
            className="p-0"
          />
        </Card>
      ))}
    </div>
  );
};

export default PresetsSelector;
