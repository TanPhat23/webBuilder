"use client";

import { appProject } from "@/lib/interface";
import { useCanvasStore } from "@/lib/store/canvasStore";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { ArrowLeft, Eye, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadFonts } from "@/app/utils/LoadFont";

type Props = {
  project: appProject;
};

export default function DefaultSettingsPageClient({ project }: Props) {
  const router = useRouter();
  const { loadCanvasStylesFromDB, styles, canvasFontFamilies } = useCanvasStore();
  const [activeTab, setActiveTab] = useState("canvas");

  useEffect(() => {
    if (project) {
      loadCanvasStylesFromDB(project.styles);
      toast.success("Project settings loaded successfully", {position: "top-left"});
    }
    if  (canvasFontFamilies){
      loadFonts(canvasFontFamilies);
    }
  }, [project, loadCanvasStylesFromDB, canvasFontFamilies]);

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/dashboard")}
          className="mr-2"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">
          {project?.name} - Default Settings
        </h1>
      </div>

      <div className="flex">
        <div className="flex-1 p-6 overflow-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full h-full"
          >
            <TabsList className="mb-4">
              <TabsTrigger value="canvas">
                <Settings className="h-4 w-4 mr-2" />
                Canvas Settings
              </TabsTrigger>
              <TabsTrigger value="preview">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </TabsTrigger>
            </TabsList>

            <TabsContent value="canvas" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Canvas Configuration</CardTitle>
                  <CardDescription>
                    Configure the default canvas settings for your project
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    These settings will be applied to all new elements in your
                    project.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Canvas Preview</CardTitle>
                  <CardDescription>
                    Preview of canvas with applied settings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className="w-full h-full border rounded-md flex items-center justify-center"
                    style={{ ...styles }}
                  >
                    <div className="text-center p-6">
                      <h3 className="text-lg font-medium mb-2">
                        Canvas Preview
                      </h3>
                      <p className="text-muted-foreground">
                        This is how your canvas will look with the current
                        settings
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
