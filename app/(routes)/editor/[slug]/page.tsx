"use client";
import { GetAll } from "@/app/api/element/route";
import Editor from "@/components/editor/Editor";
import { useEditorContext, useEditorContextProvider } from "@/lib/context";
import { EditorElement } from "@/lib/type";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import useSWR from "swr";

export default function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const { dispatch } = useEditorContext();
  const {
    data: elements,
    error,
    isLoading,
  } = useSWR<EditorElement[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${slug}`,
    GetAll
  );

  React.useEffect(() => {
    if (elements)
      dispatch({ type: "LOAD_ELEMENTS_FROM_DB", payload: elements });
    
    
  }, [elements]);

  return <Editor projectId={slug} />;
}
