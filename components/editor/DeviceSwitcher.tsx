import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

type DeviceViewType = "PHONE" | "TABLET" | "DESKTOP";

interface DeviceSwitcherProps {
  currentDevice: DeviceViewType;
  onChange: React.Dispatch<React.SetStateAction<DeviceViewType>>;
}

const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  currentDevice,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 bg-white rounded-md shadow-sm p-1 absolute top-0 z-10 left-1/2 transform -translate-x-1/2">
      <button
        onClick={() => onChange("PHONE")}
        className={`p-2 rounded-md ${
          currentDevice === "PHONE"
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        }`}
        title="Phone view"
      >
        <Smartphone size={18} />
      </button>
      <button
        onClick={() => onChange("TABLET")}
        className={`p-2 rounded-md ${
          currentDevice === "TABLET"
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        }`}
        title="Tablet view"
      >
        <Tablet size={18} />
      </button>
      <button
        onClick={() => onChange("DESKTOP")}
        className={`p-2 rounded-md ${
          currentDevice === "DESKTOP"
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        }`}
        title="Desktop view"
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default DeviceSwitcher;
