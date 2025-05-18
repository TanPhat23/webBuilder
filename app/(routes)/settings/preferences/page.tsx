"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Switch } from "@/components/ui/switch";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { FontSettings } from "../FontSettings";

export default function PreferencesPage() {
  const { needHelp, setNeedHelp } = useElementSelectionStore();
  return (
    <div className="m-10 flex flex-col gap-8 w-full">
      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-2 items-start">
          <span className="text-xs">Tutorial</span>
          <Switch
            id="tutorial"
            checked={needHelp}
            onCheckedChange={(checked) => setNeedHelp(checked)}
          />
        </div>

        <div className="flex flex-col gap-2 items-end">
          <span className="text-xs">Dark Mode</span>
          <ModeToggle />
        </div>
      </div>

      <div className="w-full">
        <FontSettings />
      </div>
    </div>
  );
}
