"use client";
import { loadFonts } from "@/app/utils/LoadFont";
import Editor from "@/components/editor/Editor";
import EditorJoyRide from "@/components/editor/EditorJoyRide";
import { appProject } from "@/lib/interface";
import { useCanvasStore } from "@/lib/store/canvasStore";
import { useEditorStore } from "@/lib/store/editorStore";
import { useElementSelectionStore } from "@/lib/store/elementSelectionStore";
import { EditorElement } from "@/lib/type";
import { MessageCircleQuestion } from "lucide-react";
import React from "react";

interface EditorPageClientProps {
  slug: string;
  initialElements: EditorElement[];
  project: appProject;
}

export default function EditorPageClient({
  slug,
  initialElements,
  project,
}: EditorPageClientProps) {
  const loadElementsFromDB = useEditorStore(
    (state) => state.loadElementsFromDB
  );
  const loadProjectFromDB = useCanvasStore(
    (state) => state.loadCansvasStylesFromDB
  );
  const { startTour, needHelp, setStartTour } = useElementSelectionStore();
  const { fontfamilies } = useCanvasStore();
  const handleEndTour = () => {
    setStartTour(false);
    useElementSelectionStore.getState().setNeedHelp(true);
  };

  React.useEffect(() => {
    if (initialElements) {
      loadElementsFromDB(initialElements);
    }
    if (project) {
      loadProjectFromDB(project.styles);
    }
    if (fontfamilies) {
      loadFonts(fontfamilies);
    }
  }, [initialElements, loadElementsFromDB, loadProjectFromDB, project, fontfamilies]);

  return (
    <>
      <Editor projectId={slug} />
      {needHelp && (
        <div className="absolute top-2 right-2 z-50">
          <MessageCircleQuestion
            onClick={() => setStartTour(true)}
            className="w-4 cursor-pointer text-purple-500"
          />
        </div>
      )}
      {startTour && (
        <EditorJoyRide
          onTourEnd={handleEndTour}
          start={startTour}
          setStartTour={setStartTour}
        />
      )}
    </>
  );
}
