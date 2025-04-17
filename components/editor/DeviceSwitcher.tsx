import React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { DEVICE_SIZES } from "@/lib/constants/constants";

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
    <div className="flex items-center gap-2 bg-white rounded-md shadow-sm p-1 ">
      <button
        onClick={() => onChange("PHONE")}
        className={`p-2 rounded-md ${
          currentDevice === "PHONE"
            ? "bg-blue-100 text-blue-600"
            : "hover:bg-gray-100"
        }`}
        title={`width: ${DEVICE_SIZES.PHONE.width} height: ${DEVICE_SIZES.PHONE.height}`}
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
        title={`width: ${DEVICE_SIZES.TABLET.width} height: ${DEVICE_SIZES.TABLET.height}`}
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
        title={`width: ${DEVICE_SIZES.DESKTOP.width} height: ${DEVICE_SIZES.DESKTOP.height}`}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default DeviceSwitcher;
