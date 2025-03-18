"use client";
import { GetAll } from "@/app/api/element/route";
import Editor from "@/components/editor/Editor";
import EditorJoyRide from "@/components/editor/EditorJoyRide";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import { MessageCircleQuestion } from "lucide-react";
import React from "react";
import useSWR from "swr";

export default function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const { dispatch } = useEditorContext();
  const { startTour, setStartTour } = useEditorContextProvider();
  const { data: elements } = useSWR<EditorElement[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${slug}`,
    GetAll
  );

  const handleEndTour = () => setStartTour(false);

  React.useEffect(() => {
    if (elements)
      dispatch({ type: "LOAD_ELEMENTS_FROM_DB", payload: elements });
  }, [elements, dispatch]);

  return (
    <>
      <Editor projectId={slug} />
      <div className="absolute top-2 right-2 z-50">
        <MessageCircleQuestion
          onClick={() => setStartTour(true)}
          size={24}
          className="text-gray-700 hover:text-blue-500 cursor-pointer transition-colors"
        />
      </div>
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
