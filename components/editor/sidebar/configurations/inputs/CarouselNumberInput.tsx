import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  onChange: (value: number) => void;
};

const CarouselNumberInput: React.FC<Props> = ({
  id,
  label,
  value,
  min = 1,
  max,
  step = 1,
  className = "w-24",
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="number"
        className={className}
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </div>
  );
};

export default CarouselNumberInput;
