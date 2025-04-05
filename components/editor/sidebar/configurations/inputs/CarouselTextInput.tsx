import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  id: string;
  label: string;
  value: string;
  className?: string;
  onChange: (value: string) => void;
};

const CarouselTextInput: React.FC<Props> = ({
  id,
  label,
  value,
  className = "w-24",
  onChange,
}) => {
  return (
    <div className="flex justify-between items-center">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="text"
        className={className}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default CarouselTextInput;
