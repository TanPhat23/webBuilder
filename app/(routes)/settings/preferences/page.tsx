"use client";
import { useCallback, useRef } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Switch } from "@/components/ui/switch";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select" ;
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card" ;
import { Button } from  "@/components/ui/button";
import { applyFontToWebsite, getCurrentWebsiteFont, createFontStyle, loadAllPopularFonts, popularFonts } from "@/app/utils/LoadFont";

export default function PreferencesPage() {
  const { needHelp, setNeedHelp } = useElementSelectionStore();
  const fontRef = useRef(getCurrentWebsiteFont());
  const previewText = "The quick brown fox jumps over the lazy dog";
  
  loadAllPopularFonts();
  const handleFontChange = useCallback((fontName:   string) => {
      fontRef.current = fontName;
  },[]);
  const applyFont = useCallback(() => {
      applyFontToWebsite(fontRef.current);
  },[]);
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
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Website Typography</CardTitle>
            <CardDescription className="text-gray-500">
              Select your preferred typeface for the entire application
            </CardDescription >
          </CardHeader >
          <CardContent className="space-y-5 pt-1">
            <div className="space-y-3 mb-1">
              <label className="text-sm font-medium leading-none">Choose Font</label>
              <Select defaultValue={fontRef.current} onValueChange={handleFontChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a typeface" />
                </SelectTrigger >
                <SelectContent className="max-h-72">
                  {popularFonts.map((fontFamily) => (
                    <SelectItem key={fontFamily} value={fontFamily}>
                      <span style={createFontStyle(fontFamily)}>{fontFamily}</span>
                    </SelectItem >
                  )) }
                </SelectContent >
              </Select >
            </div >
            <div className="space-y-3 my-2">
              <label className="text-sm font-medium leading-none">Typography Preview</label>
              <div
                className="p-5 border rounded-lg bg-background/40" 
                style={createFontStyle(fontRef.current)}
               >
                <p className="text-base">{previewText}</p>
                <p className="text-sm mt-3">
                  <span className="font-bold">Bold sample</span> and <span className="italic">italicized sample</span> demonstration
                </p >
              </div >
            </div >
            <Button onClick={applyFont} className="w-full mt-2" variant="default">
              Save Typography Selection
            </Button >
          </CardContent >
        </Card >
      </div>
    </div>
  );
}
