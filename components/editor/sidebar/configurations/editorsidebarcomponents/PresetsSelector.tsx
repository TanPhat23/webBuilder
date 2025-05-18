import { Card, CardContent} from "@/components/ui/card";
import Presets from "@/lib/constants/presets";
import { CanvasStyles } from "@/lib/interface";
import { useCanvasStore } from "@/lib/store/canvasStore";
import { useParams } from "next/navigation";

const PresetsSelector = () => {
  const { slug } = useParams();
  const { setStyles } = useCanvasStore();
  const handlePresetClick = (preset: CanvasStyles) => {
    setStyles(slug as string, preset);
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
