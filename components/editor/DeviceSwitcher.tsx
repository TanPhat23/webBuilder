"use client";

import type React from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";
import { DEVICE_SIZES } from "@/lib/constants/constants";
import { cn } from "@/lib/utils";

export type DeviceViewType = "PHONE" | "TABLET" | "DESKTOP";

interface DeviceSwitcherProps {
  currentDevice: DeviceViewType;
  onChange: (device: DeviceViewType) => void;
}

const DeviceSwitcher: React.FC<DeviceSwitcherProps> = ({
  currentDevice,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 rounded-md  p-2 ">
      <button
        onClick={() => onChange("PHONE")}
        className={cn(
          "p-2 rounded-md transition-all flex items-center gap-1.5",
          currentDevice === "PHONE"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
        title={`Mobile view - ${DEVICE_SIZES.PHONE.width}px × ${DEVICE_SIZES.PHONE.height}px`}
        aria-pressed={currentDevice === "PHONE"}
      >
        <Smartphone size={18} />
      </button>
      <button
        onClick={() => onChange("TABLET")}
        className={cn(
          "p-2 rounded-md transition-all flex items-center gap-1.5",
          currentDevice === "TABLET"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
        title={`Tablet view - ${DEVICE_SIZES.TABLET.width}px × ${DEVICE_SIZES.TABLET.height}px`}
        aria-pressed={currentDevice === "TABLET"}
      >
        <Tablet size={18} />
      </button>
      <button
        onClick={() => onChange("DESKTOP")}
        className={cn(
          "p-2 rounded-md transition-all flex items-center gap-1.5",
          currentDevice === "DESKTOP"
            ? "bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300"
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        )}
        title={`Desktop view - ${DEVICE_SIZES.DESKTOP.width} × ${DEVICE_SIZES.DESKTOP.height}`}
        aria-pressed={currentDevice === "DESKTOP"}
      >
        <Monitor size={18} />
      </button>
    </div>
  );
};

export default DeviceSwitcher;
