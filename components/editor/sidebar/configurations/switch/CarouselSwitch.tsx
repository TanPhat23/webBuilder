import React from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type Props = {
  id: string;
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
};

const CarouselSwitch: React.FC<Props> = ({
  id,
  label,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <Label htmlFor={id}>{label}</Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default CarouselSwitch;
