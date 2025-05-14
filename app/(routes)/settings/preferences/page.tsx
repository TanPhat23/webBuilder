"use client";
import { useEffect, useState } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { Switch } from "@/components/ui/switch";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { applyFontToWebsite, createFontStyle, getCurrentWebsiteFont, loadAllPopularFonts, popularFonts } from "@/app/utils/LoadFont";

export default function PreferencesPage() {
  const { needHelp, setNeedHelp } = useElementSelectionStore();
  const [selectedFont, setSelectedFont] = useState(getCurrentWebsiteFont());
  const [previewText] = useState("The quick brown fox jumps over the lazy dog");

  useEffect(() => {
    // Load all popular fonts for preview
    loadAllPopularFonts();
  }, []);

  const handleFontChange = (fontName: string) => {
    setSelectedFont(fontName);
  };

  const applyFont = () => {
    applyFontToWebsite(selectedFont);
  };

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
        <Card>
          <CardHeader>
            <CardTitle>Font Settings</CardTitle>
            <CardDescription>
              Choose a font family for your entire website
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">Font Family</label>
              <Select value={selectedFont} onValueChange={handleFontChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a font" />
                </SelectTrigger>
                <SelectContent>
                  {popularFonts.map((font) => (
                    <SelectItem key={font} value={font}>
                      <span style={createFontStyle(font)}>{font}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Preview</label>
              <div 
                className="p-4 border rounded-md" 
                style={createFontStyle(selectedFont)}
              >
                <p className="text-lg">{previewText}</p>
                <p className="text-sm mt-2">
                  <span className="font-bold">Bold text</span> and <span className="italic">italic text</span> preview
                </p>
              </div>
            </div>

            <Button onClick={applyFont} className="w-full">
              Apply Font to Website
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
