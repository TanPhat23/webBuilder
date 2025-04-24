"use client";
import { ModeToggle } from "@/components/ModeToggle";
import { Switch } from "@/components/ui/switch";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";

export default function PreferencesPage() {
  const { needHelp, setNeedHelp } = useElementSelectionStore();
  return (
    <div className="m-10 justify-between w-full flex">
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
  );
}
