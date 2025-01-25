"use client";
import React, { useEffect, useReducer, useState } from "react";
import Editor from "../components/editor/Editor";

import SideBar from "@/components/SideBar";
import { EditorContext } from "@/lib/context";
import { elementsReducer } from "@/lib/editorReducer";

function WebBuilder() {
  const [elements, dispatch] = useReducer(elementsReducer, []);
  useEffect(() => {
    const savedElements = localStorage.getItem("elements");
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
  return (
    <div className="flex justify-between">
      <EditorContext.Provider value={{ elements, dispatch }}>
        <Editor />
        <SideBar />
      </EditorContext.Provider>
    </div>
  );
}

export default WebBuilder;
