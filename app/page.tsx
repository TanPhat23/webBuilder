"use client";
import React, {
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Editor from "../components/editor/Editor";

import { EditorContext, ImageUploadContext } from "@/lib/context";
import { elementsReducer } from "@/lib/editorReducer";
import SideBar from "@/components/sidebar/SideBar";
import { loadFont } from "./utils/LoadFont";

const loadedFonts = new Set<string>();

function WebBuilder() {
  const [elements, dispatch] = useReducer(elementsReducer, []);
  const [uploadImages, setUploadImages] = useState<string[]>([]);
  useEffect(() => {
    const savedElements  = localStorage.getItem("elements");
    if (savedElements) {
      try {
        dispatch({
          type: "LOAD_ELEMENTS_FROM_LOCAL_STORAGE",
          payload: JSON.parse(savedElements),
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    const fontsToLoad = new Set<string>();
    elements.forEach((element) => {
      const fontFamily = element.styles?.fontFamily;
      if (fontFamily && !loadedFonts.has(fontFamily)) {
        fontsToLoad.add(fontFamily);
        loadedFonts.add(fontFamily); 
      }
    });
    fontsToLoad.forEach((font) => loadFont(font));
  }, [elements]);

  const editorValue = useMemo(() => ({ elements, dispatch }), [elements]);
  const imageUploadValue = useMemo(
    () => ({ uploadImages, setUploadImages }),
    [uploadImages]
  );
  return (
    
    <div className="flex justify-between">
      <ImageUploadContext.Provider value={imageUploadValue}>
        <EditorContext.Provider value={editorValue}>
          <SideBar />
          <Editor />
        </EditorContext.Provider>
      </ImageUploadContext.Provider>
    </div>
  );
}

export default WebBuilder;
